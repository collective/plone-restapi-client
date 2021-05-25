import fetch from 'cross-fetch';

const apiPath = 'http://localhost:8080/Plone';
const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
}

async function get(path: string): Promise<Record<string, any>> {
  const res = await fetch(`${apiPath}${path}`, { headers });
  const json = await res.json();
  return json;
}

export {
  get,
}
