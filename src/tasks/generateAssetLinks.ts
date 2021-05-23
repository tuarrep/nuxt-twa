import path from 'path'
import consola from 'consola'
import { DigitalAssetLinks } from '@bubblewrap/core'
import fs from 'fs-extra'
import { TWAContext } from '../types'

export async function generateAssetLinks (context: TWAContext) {
  if (!context.keyConfig) {
    return consola.warn('No Asset Links file generated because keys are not configured.')
  }

  const digitalAssetLinks = DigitalAssetLinks.generateAssetLinks(
    context.twaManifest.packageId,
    (await context.tooling.keyTool.keyInfo(context.keyConfig)).fingerprints.get('SHA256')
  )
  const linksPath = path.resolve(
    context.nuxtOptions.generate.dir,
    '.well-known/assetlinks.json'
  )

  await fs.mkdirp(path.dirname(linksPath), null)
  await fs.promises.writeFile(linksPath, digitalAssetLinks)
  consola.success('Asset links emitted')
}
