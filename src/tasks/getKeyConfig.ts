import consola from 'consola'
import { TWAContext } from '../types'

// eslint-disable-next-line require-await
export async function getKeyConfig (context: TWAContext): Promise<void> {
  const keyStorePath = process.env.KEYSTORE_PATH
  const keyStorePassword = process.env.KEYSTORE_PASSWORD
  const keyStoreKey = process.env.KEYSTORE_KEY
  const keyStoreKeyPassword = process.env.KEYSTORE_KEY_PASSWORD
  if (
    !keyStorePath ||
    !keyStorePassword ||
    !keyStoreKey ||
    !keyStoreKeyPassword
  ) {
    consola.warn(
      'Missing or invalid key store config, Android build will NOT be signed and no asset links will be generated.'
    )
  } else {
    context.keyConfig = {
      path: keyStorePath,
      alias: keyStoreKey,
      keypassword: keyStoreKeyPassword,
      password: keyStorePassword
    }
  }
}
