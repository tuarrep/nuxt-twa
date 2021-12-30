---
title: Introduction
description: 'Publish your PWA on the Google Play Store'
position: 0
category: ''
features:
  - Uses @nuxtjs/pwa module generated manifest.
  - Generates all the Android files needed.
  - Build APK and AAB.
  - Handles artifacts signing if keys are provided.
  - Generates and emits asset links file in the dist folder.
---

Fully automated [TWA](https://developer.chrome.com/docs/android/trusted-web-activity/overview/) solution for [Nuxt.js](https://nuxtjs.org)

## Compatibility
- ✅ NuxtJs 2.x
- ✅ NuxtJs Bridge
- ❌ NuxtJs 3.x

## Warning

This module is in **early beta** stage. It is actually not tested, neither used in production.
However, the basic functions are present and functional in a nominal use case (see below).

Feel free to test it, [open an issue](https://github.com/tuarrep/nuxt-twa/issues) or [suggest a change](https://github.com/tuarrep/nuxt-twa/pulls).

## Features

<list :items="features"></list>

## What's working? What's not?
Android project generation, building and asset links are functionnal.

At the moment:
 - Only the [**static target**](https://nuxtjs.org/docs/2.x/features/deployment-targets) is supported;
 - The project folder is fully removed on each build (no customizations are possible);
 - You must install all the [Android toolchain](https://developer.android.com/studio);
 - There are no automated tests at all.

<p class="flex items-center">Enjoy light and dark mode:&nbsp;<app-color-switcher class="p-2"></app-color-switcher></p>
