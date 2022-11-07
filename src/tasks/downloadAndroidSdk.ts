import * as path from 'path'
import fs from 'fs-extra'
import { fetchUtils, util } from '@bubblewrap/core'
import ora from 'ora'
import consola from 'consola'
import { Presets, Bar } from 'cli-progress'
import chalk from 'chalk'

const SDK_VERSION = '6609375'
const DOWNLOAD_SDK_ROOT = 'https://dl.google.com/android/repository/'
const WINDOWS_URL = `commandlinetools-win-${SDK_VERSION}_latest.zip`
const MAC_URL = `commandlinetools-mac-${SDK_VERSION}_latest.zip`
const LINUX_URL = `commandlinetools-linux-${SDK_VERSION}_latest.zip`

export async function downloadAndroidSdk (process: NodeJS.Process, installPath: string, totalSize = 0): Promise<string> {
  let downloadFileName
  switch (process.platform) {
    case 'darwin': {
      downloadFileName = MAC_URL
      break
    }
    case 'linux': {
      downloadFileName = LINUX_URL
      break
    }
    case 'win32': {
      downloadFileName = WINDOWS_URL
      break
    }
    default:
      throw new Error(`Unsupported Platform: ${this.process.platform}`)
  }

  const dstPath = path.resolve(installPath)
  const downloadUrl = DOWNLOAD_SDK_ROOT + downloadFileName
  const localPath = path.join(dstPath, downloadFileName)

  await fs.mkdirp(dstPath)

  const progressBar = new Bar({
    format: ` Downloading Android SDK [${chalk.green('{bar}')}] {percentage}% | {value}k of {total}k`
  }, Presets.shades_classic)

  progressBar.start(Math.round(totalSize / 1024), 0)
  await fetchUtils.downloadFile(downloadUrl, localPath, (current, total) => {
    if (total > 0 && total !== totalSize) {
      progressBar.setTotal(Math.round(total / 1024))
      totalSize = total
    }
    progressBar.update(Math.round(current / 1024))
  })
  progressBar.stop()

  const progressLogger = ora('Unzipping Android SDK').start()
  await util.unzipFile(localPath, dstPath, true)

  progressLogger.stop()
  consola.success('Android SDK downloaded')

  return dstPath
}
