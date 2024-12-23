import { readFileSync } from 'node:fs';
import fetch from 'sync-fetch';

const DEFAULT_ENCODING = 'utf-8';

export const isLocalUrl = (url: string) =>
  /^([a-zA-Z]:)?(\\|\/)([^\\\/]+(\\|\/)?)+$/.test(url);
export const isLocalRelativeUrl = (url: string) =>
  /^(\.\.\/|\.\/)?([^\\\/]+(\\|\/)?)+$/.test(url);
export const isHttpsUrl = (url: string) => /^https?:\/\//.test(url);
export const isSshUrl = (url: string) => /^git@[^:]+:[^/]+\/.+\.git$/.test(url);

/*
The note about sync

The listener approach of the chosen Antlr transpiler is working sequentially:
1. The parse tree is traversed (```.walk```)
2. The listener hooks invoked on each node of the parse tree

The hooks (e.g. 'enterImportStatement') are void-returning by the nature. So, the hooks are synchronous.
That is the problem, the next traversing step won't wait 'till previous is resolved 'cause it's void anyways.
And an asynchronous logic in hooks can not be applied before the next step possibly needing it.

There is 3 solutions:
1. Using Visitor approach and evaluate every parsing tree node by hand
2. Rewrite the antlr core so the "walk" awaits
3. Use only sync functions in hooks

The third is most appropriate by now, hence not the most elegant.
To synchronize the http request, one may want:
1. Create a worker with all the asynchronous logic
2. Execute this worker in a synchronus manner inside the main thread

All the above is encapsulated in "sync-fetch" using 'execSync' of 'node:process'.
Not the best solution, but for sync fetching of remote imports - it's OK.
*/

export const fetchContent = (url: string): string => {
  let content;

  switch (true) {
    case isHttpsUrl(url):
      content = fetchFileContentViaHttps(url);
      break;

    case isSshUrl(url):
      throw new Error('Not implemented import resource type: SSH');

    case isLocalUrl(url):
    case isLocalRelativeUrl(url):
      content = readFromFile(url);
      break;

    default:
      throw new Error(`Not supported import resource type: ${url}`);
  }

  return content;
};

export const readFromFile = (filePath: string): string => {
  try {
    const content = readFileSync(filePath, DEFAULT_ENCODING);
    return content;
  } catch (error: any) {
    throw new Error(
      `Error reading file at ${filePath} with description ${error.message}`,
    );
  }
};

export const fetchFileContentViaHttps = (url: string): string => {
  const response = fetch(url);

  if (!response.ok) {
    throw new Error(
      `Failed to https fetch imported file: ${response.status} ${response.statusText}`,
    );
  }

  return response.text();
};
