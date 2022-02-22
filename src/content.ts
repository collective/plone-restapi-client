import { fetch } from './client';

export async function get<T>(path: string): Promise<Record<string, any> & T> {
  const res = await fetch(path);
  const json = await res.json();
  return json;
}
