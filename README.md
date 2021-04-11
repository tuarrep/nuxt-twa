# nuxt-twa

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Github Actions CI][github-actions-ci-src]][github-actions-ci-href]
[![Codecov][codecov-src]][codecov-href]
[![License][license-src]][license-href]

> Nuxt.js module for generating Trusted Web App from Nuxt.js app

[📖 **Release Notes**](./CHANGELOG.md)

## Setup

1. Add `nuxt-twa` dependency to your project

```bash
yarn add nuxt-twa # or npm install nuxt-twa
```

2. Add `nuxt-twa` to the `modules` section of `nuxt.config.js`

```js
{
  modules: [
    // Simple usage
    'nuxt-twa',

    // With options
    ['nuxt-twa', { /* module options */ }]
  ]
}
```

## Development

1. Clone this repository
2. Install dependencies using `yarn install` or `npm install`
3. Start development server using `npm run dev`

## License

[MIT License](./LICENSE)

Copyright (c) Nicolas Perraut <n.perraut@gmail.com>

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/nuxt-twa/latest.svg
[npm-version-href]: https://npmjs.com/package/nuxt-twa

[npm-downloads-src]: https://img.shields.io/npm/dt/nuxt-twa.svg
[npm-downloads-href]: https://npmjs.com/package/nuxt-twa

[github-actions-ci-src]: https://github.com/tuarrep/nuxt-twa/workflows/ci/badge.svg
[github-actions-ci-href]: https://github.com/tuarrep/nuxt-twa/actions?query=workflow%3Aci

[codecov-src]: https://img.shields.io/codecov/c/github/tuarrep/nuxt-twa.svg
[codecov-href]: https://codecov.io/gh/tuarrep/nuxt-twa

[license-src]: https://img.shields.io/npm/l/nuxt-twa.svg
[license-href]: https://npmjs.com/package/nuxt-twa
