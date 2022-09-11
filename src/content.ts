import { fetch, PloneResponse } from './client';

export type PloneContent = {
  '@id': string;
  '@type': string;
  '@components': {
    actions: {
      '@id': string;
    };
    breadcrumbs: {
      '@id': string;
    };
    contextnavigation: {
      '@id': string;
    };
    navigation: {
      '@id': string;
    };
    types: {
      '@id': string;
    };
    workflow: {
      '@id': string;
    };
    [key: string]: {
      '@id': string;
    };
  };
  id: string;
  title: string;
  description?: string;
  allow_discussion?: boolean | null;
  blocks?: {
    [id: string]: any;
  };
  blocks_layout?: {
    items: string[];
  };
  contributors?: string[];
  creators?: string[];
  effective?: string | null;
  exclude_from_nav?: boolean | null;
  expires?: string | null;
  is_folderish?: boolean | null;
  items?: PloneContent[];
  items_total?: number | null;
  language?: {
    title: string;
    token: string;
  };
  lock?: {
    locked: boolean;
    stealable: boolean;
  };
  parent?: PloneContent;
  relatedItems?: PloneContent[];
  rights?: string;
  subjects?: string[];
  table_of_contents?: boolean | null;
};

/**
 * Request the current state of the content
 * @param {string} path - /folder/\{document-id}
 * @param {object} options - optional additional params for the request
 * @returns {Promise<PloneContent>}
 */
export async function get<T = PloneContent>(
  path: string,
  options: RequestInit = {}
): Promise<T & PloneResponse> {
  const res = await fetch(path, options);
  const json = await res.json();

  return {
    ...json,
    status: res.status,
  };
}

/**
 * Creates a new content within the path
 * @param {string} path - /folder/\{document-id}
 * @param {Partial<PloneContent>} content - the content to create
 * @param {object} options - optional additional params for the request
 * @returns {Promise<PloneContent>}
 */
export async function add<T = PloneContent>(
  path: string,
  content: Partial<PloneContent> & {
    '@type': string;
    title: string;
  },
  options: RequestInit = {}
): Promise<T & PloneResponse> {
  const res = await fetch(path, {
    ...options,
    method: 'POST',
    body: JSON.stringify(content),
  });
  const json = await res.json();

  return {
    ...json,
    status: res.status,
  };
}

/**
 * Update the content details
 * @param {string} path - /folder/\{document-id}
 * @param {Partial<PloneContent>} content - subset of the content to update
 * @param {object} options - optional additional params for the request
 * @returns {Promise<PloneContent>}
 */
export async function update<T = PloneContent>(
  path: string,
  content: Partial<PloneContent>,
  options: RequestInit = {}
): Promise<T & PloneResponse> {
  const res = await fetch(path, {
    ...options,
    method: 'PATCH',
    body: JSON.stringify(content),
  });
  const json = await res.json();

  return {
    ...json,
    status: res.status,
  };
}

/**
 * Remove the content
 * @param {string} path - /folder/\{document-id}
 * @returns {Promise<PloneResponse>}
 */
export async function remove(path: string): Promise<PloneResponse> {
  const res = await fetch(path, {
    method: 'DELETE',
  });

  return {
    status: res.status,
  };
}
