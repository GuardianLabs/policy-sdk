import { DAY_IN_SECONDS, SECONDS_IN_MINUTE } from './constants';
import { TimezoneOffset } from './types';

export const toSeconds = (hours: number) => {
  if (hours <= 24) return hours * 60 * 60;
  return hours;
};

export const getWeekday = (timestamp: number = nowSeconds()): number => {
  // week day starts with 0 which is Sunday
  const result = Math.floor((timestamp / DAY_IN_SECONDS + 4) % 7);

  return result;
};

export const getDaySeconds = (timestamp: number): number => {
  // seconds elapsed from the 00:00
  const result = timestamp % DAY_IN_SECONDS;

  return result;
};

export const getDaySecondsWithOffset = (
  timestamp: number,
  offsetParams: TimezoneOffset,
): number => {
  // seconds elapsed from the 00:00
  const timestampWithOffset = applyOffset(timestamp, offsetParams);
  return getDaySeconds(timestampWithOffset);
};

export const getWeekdayWithOffset = (
  timestamp: number,
  offsetParams: TimezoneOffset,
): number => {
  // week day starts with 0 which is Sunday
  const timestampWithOffset = applyOffset(timestamp, offsetParams);
  return getWeekday(timestampWithOffset);
};

export const nowSeconds = (): number => {
  return Math.round(Date.now() / 1000);
};

const applyOffset = (timestamp: number, offsetParams: TimezoneOffset) => {
  const [, offsetInMinutes, isNgetative] = offsetParams;
  const timestampWithOffset = isNgetative
    ? timestamp - offsetInMinutes * SECONDS_IN_MINUTE
    : timestamp + offsetInMinutes * SECONDS_IN_MINUTE;
  return timestampWithOffset;
};

export const pickNextOpenTime = (
  openingSeconds: number[],
  closingSeconds: number[],
  offsetParams: TimezoneOffset,
  currentTimestamp: number,
): number => {
  if (openingSeconds.length !== 7)
    throw new Error(
      `Incorrect length of opening-seconds list: ${openingSeconds.length}`,
    );
  if (closingSeconds.length !== 7)
    throw new Error(
      `Incorrect length of closingSeconds-seconds list: ${closingSeconds.length}`,
    );
  const DELAY = 10; // seconds

  const weekday = getWeekdayWithOffset(currentTimestamp, offsetParams);
  const weekDayOpenSeconds = openingSeconds[weekday];
  const weekDayCloseSeconds = closingSeconds[weekday];

  const { nextOpenWeekday, daysPassed } = pickNextWorkingDay(
    weekday,
    openingSeconds,
    closingSeconds,
  );
  const nextWeekDayOpenSeconds = openingSeconds[nextOpenWeekday];

  const elapsedDaySeconds = getDaySecondsWithOffset(
    currentTimestamp,
    offsetParams,
  );
  const isBusinessClosed =
    elapsedDaySeconds < weekDayOpenSeconds - DELAY ||
    elapsedDaySeconds > weekDayCloseSeconds - DELAY;

  if (isBusinessClosed) {
    const nextWorkingTimestamp =
      daysPassed * DAY_IN_SECONDS +
      nextWeekDayOpenSeconds +
      DELAY +
      (currentTimestamp + (DAY_IN_SECONDS - elapsedDaySeconds));
    return nextWorkingTimestamp;
  } else {
    const nextWorkingTimestamp = currentTimestamp + DELAY;
    return nextWorkingTimestamp;
  }
};

export const pickNextClosedTime = (
  openingSeconds: number[],
  closingSeconds: number[],
  offsetParams: TimezoneOffset,
  currentTimestamp: number,
): number => {
  if (openingSeconds.length !== 7)
    throw new Error(
      `Incorrect length of opening-seconds list: ${openingSeconds.length}`,
    );
  if (closingSeconds.length !== 7)
    throw new Error(
      `Incorrect length of closingSeconds-seconds list: ${closingSeconds.length}`,
    );
  const DELAY = 10; // seconds

  const weekday = getWeekdayWithOffset(currentTimestamp, offsetParams);
  const weekDayOpenSeconds = openingSeconds[weekday];
  const weekDayCloseSeconds = closingSeconds[weekday];

  const { daysPassed, nextOpenWeekday } = pickNextWorkingDay(
    weekday,
    openingSeconds,
    closingSeconds,
  );
  const nextWeekDayOpenSeconds = openingSeconds[nextOpenWeekday];

  const elapsedDaySeconds = getDaySecondsWithOffset(
    currentTimestamp,
    offsetParams,
  );
  const isBusinessClosed =
    elapsedDaySeconds < weekDayOpenSeconds - DELAY ||
    elapsedDaySeconds > weekDayCloseSeconds - DELAY;

  if (isBusinessClosed) {
    return currentTimestamp + DELAY;
  } else {
    const nexClosedTimestamp =
      daysPassed * DAY_IN_SECONDS +
      nextWeekDayOpenSeconds -
      DELAY +
      (currentTimestamp + (DAY_IN_SECONDS - elapsedDaySeconds));
    return nexClosedTimestamp;
  }
};

const pickNextWorkingDay = (
  weekday: number,
  openingSeconds: number[],
  closingSeconds: number[],
  daysPassed: number = 0,
): { daysPassed: number; nextOpenWeekday: number } => {
  const nextOpenWeekday = (weekday + 1) % 7;
  if (daysPassed == 7)
    throw new Error(
      'Can not pick working day, since no open days during a week configured',
    );

  const nextWeekDayOpenSeconds = openingSeconds[nextOpenWeekday];
  const nextWeekDayCloseSeconds = closingSeconds[nextOpenWeekday];

  // if next picked day is closed
  if (nextWeekDayOpenSeconds === 0 && nextWeekDayCloseSeconds === 0) {
    return pickNextWorkingDay(
      nextOpenWeekday,
      openingSeconds,
      closingSeconds,
      ++daysPassed,
    );
  }

  return { daysPassed, nextOpenWeekday };
};
