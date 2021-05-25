---
title: Building
description: 'Distribute your PWA on the Google Play Store'
position: 2
category: Guide
---

The building process is fully automated when running `nuxt generate` as usual.

Please ensure your Android toolchain is valid before building.

The following files are generated during the build process:
- `<project root>/android`: Android project containing the app to be built;
- `<project root>/android/app-release-bundle.aab`: Signed app bundle of your app;
- `<project root>/android/app-release-signed.apk`: Signed APK archive of your app;
- `<project root>/android/app-release-signed.apk.idsig`: The signature of the generated APK.

To deploy your app it's recommended to use the AAB file insteadof the APK (only one of them is necessary). Learn more about Android App Bundle on the [dedicated documentation page](https://developer.android.com/guide/app-bundle).
