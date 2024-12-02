export {
  BusinessHoursValidation,
  TrustedTimezoneOffsetSource,
} from '../../../src/typechain';

export type TimezoneOffset = [
  /* timezone name */ string,
  /* offset value in minutes */ number,
  /* if offset is negative */ boolean,
];
