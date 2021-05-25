import { init } from '../src/client';
import { get } from '../src/content';

init('http://localhost:8080/Plone');

it('gets content for the homepage', async () => {
  const res = await get('/');
  expect(res['@type']).toEqual('Plone Site');
  const news = await get('/news');
  expect(news['@type']).toEqual('Folder');
  expect(news.title).toEqual('Notizie');
});
