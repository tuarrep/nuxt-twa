import path from 'path'
import fs from 'fs'
import ora from 'ora'
import consola from 'consola'
import chalk from 'chalk'
import { TWAContext } from '../types'

export async function buildApk (context: TWAContext) {
  const progressLogger = ora('Building APK...').start()

  await context.tooling.gradleWrapper.assembleRelease()

  const unsignedApkPath = path.resolve(context.options.targetDir, './app/build/outputs/apk/release/app-release-unsigned.apk')

  if (context.keyConfig) {
    progressLogger.text = 'Signing APK...'
    const signedApkPath = path.resolve(context.options.targetDir, './app-release-signed.apk')
    await context.tooling.androidSdkTools.apksigner(context.keyConfig.path, context.keyConfig.password, context.keyConfig.alias, context.keyConfig.keypassword, unsignedApkPath, signedApkPath)
  } else {
    await fs.promises.copyFile(unsignedApkPath, context.options.targetDir)
  }

  progressLogger.stop()
  consola.success(`APK built ${context.keyConfig ? 'and' : chalk.bold.yellow('NOT')} signed`)
}
