import { expect, test } from '@jest/globals'
import * as DirentType from '../src/parts/DirentType/DirentType.ts'
import * as GetIconRequests from '../src/parts/GetIconRequests/GetIconRequests.ts'

test('gets icon requests for empty array', () => {
  const items: any[] = []
  const provider = {}
  expect(GetIconRequests.getIconRequests(items, provider)).toEqual([])
})

test('gets icon requests for items with file icons', () => {
  const items = [{ pick: '/test/file.txt' }, { pick: '/test/other.txt' }]
  const provider = {
    getPickFileIcon(pick: any): any {
      return {
        type: DirentType.File,
        name: pick.pick,
      }
    },
  }
  expect(GetIconRequests.getIconRequests(items, provider)).toEqual([
    {
      type: DirentType.File,
      name: '/test/file.txt',
      path: '',
    },
    {
      type: DirentType.File,
      name: '/test/other.txt',
      path: '',
    },
  ])
})

test('gets icon requests for items without file icons', () => {
  const items = [{ pick: '/test/file.txt' }, { pick: '/test/other.txt' }]
  const provider = {
    getPickFileIcon(): any {
      return undefined
    },
  }
  expect(GetIconRequests.getIconRequests(items, provider)).toEqual([
    {
      type: undefined,
      name: undefined,
      path: '',
    },
    {
      type: undefined,
      name: undefined,
      path: '',
    },
  ])
})

test.skip('gets icon requests for items with mixed icon types', () => {
  const items = [{ pick: '/test/file.txt' }, { pick: '/test/folder' }]
  const provider = {
    getPickFileIcon(pick: any): any {
      if (pick && pick.endsWith('.txt')) {
        return {
          type: DirentType.File,
          name: pick,
        }
      }
      return {
        type: DirentType.Directory,
        name: pick,
      }
    },
  }
  expect(GetIconRequests.getIconRequests(items, provider)).toEqual([
    {
      type: DirentType.File,
      name: '/test/file.txt',
      path: '',
    },
    {
      type: DirentType.Directory,
      name: '/test/folder',
      path: '',
    },
  ])
})

test.skip('handles null/undefined provider', () => {
  const items = [{ pick: '/test/file.txt' }]
  expect(GetIconRequests.getIconRequests(items, null)).toEqual([
    {
      type: undefined,
      name: undefined,
      path: '',
    },
  ])
})
