import {
  AndroidSdkTools,
  Config,
  GradleWrapper,
  JarSigner,
  JdkHelper,
  KeyTool
} from '@bubblewrap/core'
import { TWAContext } from '../types'

export async function setupTooling (context: TWAContext) {
  const androidSdkPath =
    context.options.androidSdkPath ||
    process.env.ANDROID_HOME ||
    process.env.ANDROID_SDK_ROOT
  if (!androidSdkPath) {
    throw new Error('No android SDK path found. Aborting Android generation')
  }

  const jdkPath = (
    context.options.jdkPath ||
    process.env.JAVA_HOME ||
    ''
  ).replace(/\/Contents\/Home\/?/, '')
  if (!jdkPath) {
    throw new Error('No Java JDK path found. Aborting Android generation')
  }

  const config = new Config(jdkPath, androidSdkPath)

  const jdkHelper = new JdkHelper(process, config)
  const androidSdkTools = await AndroidSdkTools.create(
    process,
    config,
    jdkHelper
  )
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
