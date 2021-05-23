import consola from 'consola'
import chalk from 'chalk'
import { name, version } from '../package.json'
import tasks from './tasks'
import { TWAOptions } from './types'
import { buildContext } from './utils'

export default async function twa (moduleOptions: TWAOptions) {
  const options: TWAOptions = {
    ...this.options.twa,
    ...moduleOptions
  }

  const context = buildContext(options, this.nuxt.options)

  try {
    await Promise.all([
      tasks.getKeyConfig(context),
      tasks.generateTwaManifest(context),
      tasks.setupTooling(context)
    ])
  } catch (e) {
    return consola.error(e)
  }

  this.nuxt.hook('generate:done', async (_) => {
    consola.info(
      `Starting TWA generation
      \tpackageId: ${chalk.bold.green(context.twaManifest.packageId)}
      \thost: ${chalk.bold.green(context.twaManifest.host)}`
    )

    await tasks.generateAndroidProject(context)

    try {
      await Promise.all([
        tasks.buildApk(context),
        tasks.buildAab(context)
      ])
    } catch (e) {
      consola.error(e.stdout ? e.stdout : e)
    }

    await tasks.generateAssetLinks(context)
  })
}

declare module '@nuxt/types/config/index' {
  interface NuxtOptions {
    twa?: TWAOptions;
  }
}

twa.meta = {
  name,
  version
}
