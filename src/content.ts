import { fetch } from './client';

export async function get(path: string): Promise<Record<string, any>> {
  const res = await fetch(path);
  const json = await res.json();
  return json;
}
