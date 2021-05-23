import http from 'http'
import path from 'path'
import fs from 'fs'
import serveStatic from 'serve-static'
import { TwaGenerator } from '@bubblewrap/core'
import consola from 'consola'
import { TWAContext } from '../types'

export async function generateAndroidProject (context: TWAContext) {
  const server = http
    .createServer((req, res) => serveStatic(context.nuxtOptions.generate.dir)(req, res, null))
    .listen(3000)

  // TODO: Update the project if already exists
  await new TwaGenerator().createTwaProject(context.options.targetDir, context.twaManifest, null)
  server.close()
  await fs.promises.copyFile(path.resolve(__dirname, '../assets/Android.gitignore'), path.resolve(context.options.targetDir, '.gitignore'))

  consola.success('Android project generated')
}
