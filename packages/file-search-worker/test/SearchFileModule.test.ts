import { test, expect } from '@jest/globals'
import type { SearchFileHandler } from '../src/parts/SearchFileHandler/SearchFileHandler.ts'
import { register, getModule } from '../src/parts/SearchFileModule/SearchFileModule.ts'

const mockHandler: SearchFileHandler = async (path, value, prepare, assetDir) => {
  return []
}

test('register and getModule', () => {
  const modules = {
    file: mockHandler,
  }
  register(modules)
  expect(getModule('file')).toBe(mockHandler)
})

test('getModule returns undefined for unregistered protocol', () => {
  expect(getModule('unknown')).toBeUndefined()
})

const firstHandler: SearchFileHandler = async (path, value, prepare, assetDir) => {
  return []
}

const secondHandler: SearchFileHandler = async (path, value, prepare, assetDir) => {
  return []
}

test('register overwrites existing modules', () => {
  register({ file: firstHandler })
  register({ file: secondHandler })
  expect(getModule('file')).toBe(secondHandler)
})
