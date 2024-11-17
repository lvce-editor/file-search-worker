import { expect, test } from '@jest/globals'
import * as GetMimeType from '../src/parts/GetMimeType/GetMimeType.ts'

test('html', () => {
  expect(GetMimeType.getMimeType('.html')).toBe('text/html')
})

test('css', () => {
  expect(GetMimeType.getMimeType('.css')).toBe('text/css')
})

test('ttf', () => {
  expect(GetMimeType.getMimeType('.ttf')).toBe('font/ttf')
})

test('png', () => {
  expect(GetMimeType.getMimeType('.png')).toBe('image/png')
})

test('json', () => {
  expect(GetMimeType.getMimeType('.json')).toBe('application/json')
})

test('js', () => {
  expect(GetMimeType.getMimeType('.js')).toBe('text/javascript')
})

test('ts', () => {
  expect(GetMimeType.getMimeType('.ts')).toBe('text/javascript')
})

test('mjs', () => {
  expect(GetMimeType.getMimeType('.mjs')).toBe('text/javascript')
})

test('mp3', () => {
  expect(GetMimeType.getMimeType('.mp3')).toBe('audio/mpeg')
})

test('webm', () => {
  expect(GetMimeType.getMimeType('.webm')).toBe('video/webm')
})
