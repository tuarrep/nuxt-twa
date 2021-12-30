import { AndroidSdkTools, GradleWrapper, JarSigner, KeyTool, TwaManifest } from '@bubblewrap/core'
import { NuxtOptions } from '@nuxt/types'

export interface KeyConfig {
  path: string;
  alias: string;
  keypassword: string;
  password: string;
}

export interface TWAOptions {
  androidSdkPath?: string;
  host?: string;
  jdkPath?: string;
  packageId?: string;
  targetDir?: string;
}

export interface TWATooling {
  androidSdkTools: AndroidSdkTools,
  gradleWrapper: GradleWrapper,
  jarSigner: JarSigner,
  keyTool: KeyTool
}

export interface TWAContext {
  keyConfig?: KeyConfig;
  options: TWAOptions;
  nuxtOptions: NuxtOptions;
  tooling?: TWATooling;
  twaManifest?: TwaManifest;
}
