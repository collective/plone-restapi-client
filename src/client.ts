import { default as baseFetch } from 'cross-fetch';

export let _apiPath: string;
export let _headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export function init(apiPath: string, headers: Pick<RequestInit, 'headers'> = {}): void {
  _apiPath = apiPath;
  _headers = { ..._headers, ...headers };
}

export function fetch(
  path: string,
  init: RequestInit = {},
): ReturnType<typeof baseFetch> {
  return baseFetch(
    `${_apiPath}${path}`,
    {
      ...init,
      headers: {
        ..._headers,
        ...init.headers,
      },
    },
  );
}
