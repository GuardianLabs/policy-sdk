import { EventFragment, Interface, Log, LogDescription } from 'ethers';

export const findMatchingEventArgs = (
  abiInterface: Interface,
  eventFragment: EventFragment,
  logs: ReadonlyArray<Log>,
) => {
  const parsedLogs: LogDescription[] = [];
  for (const log of logs) {
    try {
      const parsed = abiInterface.parseLog(log);
      if (!!parsed) parsedLogs.push(parsed);
    } catch (e: any) {
      // we could ignore the parsing errors
      // console.log(`Got an error while parsing logs with message: ${e.message}`);
    }
  }

  // note: process scenario when tx has several event with same signatures (e.g. [MyEvent(1,3,4), MyEvent(5,5,5)])
  const matchingEvent: LogDescription | undefined = parsedLogs.find(
    ({ fragment }) => {
      return eventFragment.name == fragment.name;
    },
  );

  if (!!matchingEvent) {
    return matchingEvent!.args.toArray();
  }

  throw new Error('Event not found');
};
