---
title: Setup
description: 'Distribute your PWA on the Google Play Store'
position: 1
category: Guide
---

Check the [Nuxt.js documentation](https://nuxtjs.org/api/configuration-modules#the-modules-property) for more information about installing and using modules in Nuxt.js.

## Installation

`nuxt-twa` depends on `@nuxtjs/pwa` module.

Add `nuxt-twa` and `@nuxtjs/pwa` dependency to your project:

<code-group>
  <code-block label="Yarn" active>

  ```bash
  yarn add --dev nuxt-twa @nuxtjs/pwa
  ```

  </code-block>
  <code-block label="NPM">

  ```bash
  npm i --save-dev nuxt-twa @nuxtjs/pwa
  ```

  </code-block>
</code-group>

Edit your `nuxt.config.js` file to add twa module:

```js{}[nuxt.config.js]
{
  buildModules: [
    '@nuxtjs/pwa',
    'nuxt-twa',
  ]
}
```

### Ignore Android folder

For the moment the Android project folder (`android` at the project's root) is fully deleted before each build.
Thus it's not required to version it in git.

Create or add this to `.gitignore`:

```{}[.gitignore]
android/
```

## Configuration

TWA generation is *almost* fully automated. The only mandatory setting is the domain on which your site will be deployed. This domain must be publicly accessible and host the app you're trying to build.

```js{}[nuxt.config.js]
{
  twa: {
    host: 'your-domain.tld' // Without any protocol
  }
}
```

For all settings available see the [dedicated page](/configuration).
