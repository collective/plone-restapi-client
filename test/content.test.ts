import { get } from '../src/content';

it('gets content for the homepage', async () => {
  const res = await get('/');
  expect(res['@type']).toEqual('Plone Site');
  const news = await get('/news');
  expect(news['@type']).toEqual('Folder');
  expect(news.title).toEqual('Notizie');
});
