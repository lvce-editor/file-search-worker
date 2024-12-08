import { expect, test } from '@jest/globals'
import { setup } from '../src/test.js'

test.skip('searchFile', async () => {
  const rpc = await setup()
  const path = '/test'
  const value = 'a'
  const prepare = false
  const assetDir = ''

  const result = await rpc.invoke('SearchFile.searchFile', path, value, prepare, assetDir)
  expect(result).toEqual([,])
})
