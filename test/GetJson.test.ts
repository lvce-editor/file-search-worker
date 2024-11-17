import { expect, test } from '@jest/globals'
import * as GetJson from '../src/parts/GetJson/GetJson.ts'

test('gets json from url', async () => {
  // @ts-ignore
  globalThis.fetch = async () => {
    return {
      ok: true,
      json: async () => ({ test: 'value' }),
    }
  }
  const result = await GetJson.getJson('http://example.com/data.json')
  expect(result).toEqual({ test: 'value' })
})

test('handles fetch error', async () => {
  globalThis.fetch = async () => {
    throw new Error('Network error')
  }
  await expect(GetJson.getJson('http://example.com/data.json')).rejects.toThrow(
    'Failed to request json for http://example.com/data.json: Network error',
  )
})

test('handles non-ok response', async () => {
  // @ts-ignore
  globalThis.fetch = async () => {
    return {
      ok: false,
      statusText: 'Not Found',
    }
  }
  await expect(GetJson.getJson('http://example.com/data.json')).rejects.toThrow('Failed to request json for http://example.com/data.json: Not Found')
})

test('handles json parse error', async () => {
  // @ts-ignore
  globalThis.fetch = async () => {
    return {
      ok: true,
      json: async () => {
        throw new Error('Invalid JSON')
      },
    }
  }
  await expect(GetJson.getJson('http://example.com/data.json')).rejects.toThrow(
    'Failed to request json for http://example.com/data.json: Invalid JSON',
  )
})
