# Plone REST API Client

[![npm version](https://img.shields.io/github/package-json/v/collective/plone-restapi-client)](https://www.npmjs.com/package/plone-restapi-client)
![Tests](https://github.com/collective/plone-restapi-client/workflows/CI/badge.svg?branch=main)
![TypeScript](https://img.shields.io/badge/TypeScript-Support-blue)

A wrapper for plone.restapi for browser and nodejs needs.

This library contains methods and typings to interact with the Plone REST API,
giving you the power to create and manage content in Plone, with the strength and DX of TypeScript support.

Every method has JSDoc annotations with usage and description and typings information for parameters and return values.

## Install

```bash
npm install --save plone-restapi-client
```

```bash
yarn add plone-restapi-client
```

## Usage

```ts
import { client, content } from 'plone-restapi-client';

client.init('http://localhost:8080/Plone');

client.auth('admin', 'admin').then(() => {
  content.get('/my-page').then(console.log);
});
```

## Development

See [DEVELOPMENT.md](DEVELOPMENT.md)
