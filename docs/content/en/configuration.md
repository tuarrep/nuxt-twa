---
title: Configuration
description: 'Distribute your PWA on the Google Play Store'
position: 10
category: Reference
---

This module tries to automate all the process and detect all settings using conventions.

## Required options
### `host`
The domain on which your site will be deployed. This domain must be publicly accessible and host the app you're trying to build.

## Optional options

### `androidSdkPath`
The location where the Android SDK is installed. Defaulted to `ANDROID_HOME` or `ANDROID_SDK_ROOT` environment variables.

### `jdkPath`
The location where the Java JDK is installed. Defaulted to `JAVA_HOME` environment variable.

### `packageId`
The Android package id. Defaulted to the `host` option, split around `.`, reversed then joined by `.` again.  
Eg: `nuxt-twa.tuarrep.dev` will generate `dev.tuarrep.nuxt-twa`.
