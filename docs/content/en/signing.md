---
title: Signing
description: 'Distribute your PWA on the Google Play Store'
position: 3
category: Guide
---

## Keys setup

For security concerns all keys setup must be done via environment variables.
All the four next variables must be set to generate a valid singing configuration.

If the signing config isn't valid the artifacts won't be signed and the asset links won't be generated as these tasks requires valid keys.

### `KEYSTORE_PATH`
The path where your keystore is located.  
Can be absolute or relative.

### `KEYSTORE_PASSWORD`
The master keystore password.

### `KEYSTORE_KEY`
The alias of the key you want to use.

### `KEYSTORE_KEY_PASSWORD`
The selected key own password.

See [Android's documentation](https://developer.android.com/studio/publish/app-signing) for more information about signing process.
