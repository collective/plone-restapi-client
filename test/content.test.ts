import { init, auth, logout } from '../src/client';
import * as content from '../src/content';

init('http://localhost:8080/Plone');

afterEach(async () => {
  await logout();
});

it('gets content for the homepage', async () => {
  const res = await content.get('/');
  expect(res.status).toBe(200);
  expect(res['@type']).toEqual('Plone Site');
  expect(res['@id']).toEqual('http://localhost:8080/Plone');
  expect(res.title).toEqual('Welcome to Volto!');
});

it('gets content for the homepage as admin', async () => {
  const { token } = await auth('admin', 'admin');
  const res = await content.get('/');
  expect(res.status).toBe(200);
  expect(res['@type']).toEqual('Plone Site');
  expect(res['@id']).toEqual('http://localhost:8080/Plone');

  expect(token).toBeDefined();
  await logout();
});

it('gets non existing content', async () => {
  const res = await content.get('awanagana');
  expect(res.status).toBe(404);
  expect(res.type).toEqual('NotFound');
});

it('creates a page', async () => {
  const { token } = await auth('admin', 'admin');
  expect(token).toBeDefined();

  const res = await content.add('/', {
    '@type': 'Document',
    title: 'Test Page',
  });
  expect(res['@type']).toEqual('Document');
  expect(res['@id']).toEqual('http://localhost:8080/Plone/test-page');
  expect(res.title).toEqual('Test Page');
  expect(res.status).toBe(201);
});

it('updates a page', async () => {
  const { token } = await auth('admin', 'admin');
  expect(token).toBeDefined();

  const res = await content.update(
    '/test-page',
    {
      title: 'Test Page',
      description: 'Test Page Description',
    },
    {
      headers: {
        Prefer: 'return=representation',
      },
    }
  );
  expect(res['@type']).toEqual('Document');
  expect(res['@id']).toEqual('http://localhost:8080/Plone/test-page');
  expect(res.title).toEqual('Test Page');
  expect(res.description).toEqual('Test Page Description');
  expect(res.status).toBe(200);
});

it('gets private content', async () => {
  const res = await content.get('/test-page');
  expect(res.status).toBe(401);
  expect(res.type).toEqual('Unauthorized');
});

it('gets private content once logged in', async () => {
  const { token } = await auth('admin', 'admin');
  expect(token).toBeDefined();

  const res = await content.get('/test-page');
  expect(res.status).toBe(200);
  expect(res['@id']).toEqual('http://localhost:8080/Plone/test-page');
  expect(res.title).toEqual('Test Page');
});

it('deletes content', async () => {
  const { token } = await auth('admin', 'admin');
  expect(token).toBeDefined();

  const res = await content.remove('/test-page');
  expect(res.status).toBe(204);
});
