import { default as baseFetch } from 'cross-fetch';

export type PloneResponse = {
  /**
   * @property {number} - The HTTP status code of the response.
   */
  status: number;

  /**
   * @property {string} type - Error type
   */
  type?: 'NotFound' | 'Unauthorized';

  /**
   * @property {string} message - Error message
   */
  message?: string;
};

export let _apiPath: string;
export let _headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};
export let _authToken: string | null = null;

/**
 * Initialize the API client.
 * @param {string} apiPath - The path to the Plone API.
 * @param headers - The headers to send with each request.
 */
export function init(
  apiPath: string,
  headers: Pick<RequestInit, 'headers'> = {}
): void {
  _apiPath = apiPath;
  _headers = { ..._headers, ...headers };
}

/**
 * Fetch a resource from the API.
 * @param {string} path - The path to the API endpoint.
 * @param {string=} init - The init object to pass to fetch.
 */
export function fetch(
  path: string,
  init: RequestInit = {}
): ReturnType<typeof baseFetch> {
  return baseFetch(`${_apiPath}${path}`, {
    ...init,
    headers: {
      ..._headers,
      ...init.headers,
      ...(_authToken ? { Authorization: `Bearer ${_authToken}` } : {}),
    },
  });
}

/**
 * Authenticate the user with the given token. Will set the authToken global.
 * @param {string} login - the username
 * @param {string} password
 * @returns {Promise<string>} - a promise for the auth token
 */
export async function auth(
  login: string,
  password: string
): Promise<{ token?: string }> {
  const res = await fetch('/@login', {
    method: 'POST',
    body: JSON.stringify({ login, password }),
  });

  const json = await res.json();

  if (json && json.token) {
    _authToken = json.token;
  }

  return json;
}

/**
 * Logout the user. Will clear the authToken global.
 * @returns {Promise<void>} - a promise for the logout
 */
export async function logout(): Promise<boolean> {
  if (!_authToken) {
    return true;
  }

  const res = await fetch('/@logout', {
    method: 'POST',
    headers: { Authorization: `Bearer ${_authToken}` },
  });

  if (res.ok) {
    _authToken = null;
    return true;
  }

  return false;
}
