import path from 'path'
import { NuxtOptions } from '@nuxt/types'
import { TWAContext, TWAOptions } from './types'

export function buildContext (
  moduleOptions: TWAOptions,
  nuxtOptions: NuxtOptions
): TWAContext {
  return {
    options: {
      ...{ targetDir: path.join(nuxtOptions.srcDir, 'android') },
      ...moduleOptions
    },
    nuxtOptions
  }
}
