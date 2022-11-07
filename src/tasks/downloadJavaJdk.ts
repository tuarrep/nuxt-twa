import * as path from 'path'
import fs from 'fs-extra'
import { fetchUtils, util } from '@bubblewrap/core'
import ora from 'ora'
import consola from 'consola'
import { Presets, Bar } from 'cli-progress'
import chalk from 'chalk'
import { unzipFile } from '@bubblewrap/core/dist/lib/util'

const JDK_VERSION = '11.0.9.1+1'
const JDK_DIR = `jdk-${JDK_VERSION}`
const DOWNLOAD_JDK_BIN_ROOT = `https://github.com/AdoptOpenJDK/openjdk11-binaries/releases/download/jdk-${JDK_VERSION}/`
const DOWNLOAD_JDK_SRC_ROOT = 'https://github.com/adoptium/jdk11u/archive/refs/tags/'
const JDK_BIN_VERSION = JDK_VERSION.replace('+', '_')
const JDK_FILE_NAME_MAC = `OpenJDK11U-jdk_x64_mac_hotspot_${JDK_BIN_VERSION}.tar.gz`
const JDK_FILE_NAME_WIN32 = `OpenJDK11U-jdk_x86-32_windows_hotspot_${JDK_BIN_VERSION}.zip`
const JDK_FILE_NAME_LINUX64 = `OpenJDK11U-jdk_x64_linux_hotspot_${JDK_BIN_VERSION}.tar.gz`
const JDK_SRC_ZIP = `jdk-${JDK_VERSION}.zip`
const JDK_SOURCE_SIZE = 190391098

export async function downloadJavaJdk (process: NodeJS.Process, installPath: string): Promise<string> {
  let unzipFunction = util.untar
  let joinPath = path.posix.join
  let downloadFile

  switch (process.platform) {
    case 'win32': {
      downloadFile = JDK_FILE_NAME_WIN32
      unzipFunction = util.unzipFile
      joinPath = path.win32.join
      break
    }
    case 'darwin': {
      downloadFile = JDK_FILE_NAME_MAC
      break
    }
    case 'linux': {
      downloadFile = JDK_FILE_NAME_LINUX64
      break
    }
    default:
      downloadFile = ''
      throw new Error(`Platform not found or unsupported: ${process.platform}.`)
  }

  const dstPath = path.resolve(installPath)
  const downloadSrcUrl = DOWNLOAD_JDK_SRC_ROOT + JDK_SRC_ZIP
  const localSrcZipPath = joinPath(dstPath, JDK_SRC_ZIP)

  await fs.mkdirp(dstPath)

  const progressBar = new Bar({
    format: ` Downloading Java JDK sources [${chalk.green('{bar}')}] {percentage}% | {value}k of {total}k`
  }, Presets.shades_classic)
  let totalSize = JDK_SOURCE_SIZE

  progressBar.start(Math.round(totalSize / 1024), 0)
  await fetchUtils.downloadFile(downloadSrcUrl, localSrcZipPath, (current, total) => {
    if (total > 0 && total !== totalSize) {
      progressBar.setTotal(Math.round(total / 1024))
      totalSize = total
    }
    progressBar.update(Math.round(current / 1024))
  })
  progressBar.stop()

  const progressLogger = ora('Unzipping Java JDK sources').start()
  await unzipFile(localSrcZipPath, dstPath, true)
  progressLogger.stop()

  const downloadBinUrl = DOWNLOAD_JDK_BIN_ROOT + downloadFile
  const localBinPath = joinPath(dstPath, downloadFile)

  progressBar.format = ` Downloading Java JDK binaries [${chalk.green('{bar}')}] {percentage}% | {value}k of {total}k`
  totalSize = 0
  progressBar.start(Math.round(totalSize / 1024), 0)
  await fetchUtils.downloadFile(downloadBinUrl, localBinPath, (current, total) => {
    if (total > 0 && total !== totalSize) {
      progressBar.setTotal(Math.round(total / 1024))
      totalSize = total
    }
    progressBar.update(Math.round(current / 1024))
  })
  progressBar.stop()

  progressLogger.start('Unzipping Java JDK binaries')
  await unzipFunction(localBinPath, dstPath, true)
  progressLogger.stop()

  consola.success('Java JDK downloaded')

  return joinPath(dstPath, JDK_DIR)
}
