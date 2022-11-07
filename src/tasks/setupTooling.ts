import {
  AndroidSdkTools,
  Config,
  GradleWrapper,
  JarSigner,
  JdkHelper,
  KeyTool
} from '@bubblewrap/core'
import { TWAContext } from '../types'
import { downloadAndroidSdk } from './downloadAndroidSdk'
import { downloadJavaJdk } from './downloadJavaJdk'

export async function setupTooling (context: TWAContext) {
  let config = await Config.loadConfig('./twa-config.json')

  if (!config) {
    const androidSdkPath =
      context.options.androidSdkPath ||
      process.env.ANDROID_HOME ||
      process.env.ANDROID_SDK_ROOT

    const jdkPath = (
      context.options.jdkPath ||
      process.env.JAVA_HOME ||
      ''
    ).replace(/\/Contents\/Home\/?/, '')
    config = new Config(jdkPath, androidSdkPath)
  }

  if ((await JdkHelper.validatePath(config.jdkPath, process)).isError()) {
    config.jdkPath = await downloadJavaJdk(process, './.tooling/java-jdk')
    await config.saveConfig('./twa-config.json')
  }
  if (!config.androidSdkPath) {
    config.androidSdkPath = await downloadAndroidSdk(process, './.tooling/android-sdk')
    await config.saveConfig('./twa-config.json')
  }

  const jdkHelper = new JdkHelper(process, config)
  const androidSdkTools = await new AndroidSdkTools(
    process,
    config,
    jdkHelper
  )

  if (!await androidSdkTools.checkBuildTools()) {
    await androidSdkTools.installBuildTools()
  }

  const gradleWrapper = new GradleWrapper(
    process,
    androidSdkTools,
    context.options.targetDir
  )
  const keyTool = new KeyTool(jdkHelper)
  const jarSigner = new JarSigner(jdkHelper)

  context.tooling = {
    androidSdkTools,
    gradleWrapper,
    jarSigner,
    keyTool
  }
}
