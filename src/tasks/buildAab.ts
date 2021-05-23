import path from 'path'
import fs from 'fs'
import ora from 'ora'
import consola from 'consola'
import chalk from 'chalk'
import { TWAContext } from '../types'

export async function buildAab (context: TWAContext) {
  const progressLogger = ora('Building AAB...').start()

  await context.tooling.gradleWrapper.bundleRelease()

  const unsignedAabPath = path.resolve(context.options.targetDir, './app/build/outputs/bundle/release/app-release.aab')

  if (context.keyConfig) {
    progressLogger.text = 'Signing AAB...'
    const signedAabPath = path.resolve(context.options.targetDir, './app-release-bundle.aab')
    await context.tooling.jarSigner.sign(context.keyConfig, context.keyConfig.password, context.keyConfig.keypassword, unsignedAabPath, signedAabPath)
  } else {
    await fs.promises.copyFile(unsignedAabPath, context.options.targetDir)
  }

  progressLogger.stop()
  consola.success(`AAB built ${context.keyConfig ? 'and' : chalk.bold.yellow('NOT')} signed`)
}
