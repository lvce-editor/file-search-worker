import { join } from 'node:path'
import { root } from './root.ts'

export const threshold = 550_000

export const instantiations = 5_000

export const instantiationsPath = join(root, 'packages', 'file-search-worker')

export const workerPath = join(root, '.tmp/dist/dist/fileSearchWorkerMain.js')

export const playwrightPath = new URL('../../e2e/node_modules/playwright/index.mjs', import.meta.url).toString()
