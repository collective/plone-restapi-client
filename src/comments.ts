import { fetch } from './client';

export async function add(path: string, text: string): Promise<boolean> {
  const data = { text };
  const res = await fetch(`${path}/@comments`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
  return res.status === 204;
}
