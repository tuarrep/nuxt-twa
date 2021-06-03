import { TwaManifest, util } from '@bubblewrap/core'
import { TWAContext } from '../types'

export async function generateTwaManifest (context: TWAContext) {
  const twaManifest = await TwaManifest.fromWebManifestJson(
    new URL(
      'http://localhost:3000' + context.nuxtOptions.pwa._manifestMeta.href
    ),
    context.nuxtOptions.manifest
  )

  twaManifest.host = context.options.host
  twaManifest.startUrl = context.nuxtOptions.manifest.start_url
  twaManifest.packageId =
    context.options.packageId || util.generatePackageId(context.options.host)
  twaManifest.generatorApp = 'nuxt-twa'

  context.twaManifest = twaManifest
}
