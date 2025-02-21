import { expect, test } from '@jest/globals'
import * as AriaRoles from '../src/parts/AriaRoles/AriaRoles.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as GetFileIconVirtualDom from '../src/parts/GetFileIconVirtualDom/GetFileIconVirtualDom.ts'
import * as VirtualDomElements from '../src/parts/VirtualDomElements/VirtualDomElements.ts'

test('creates virtual dom node for file icon', () => {
  const icon = '/path/to/icon.png'
  const result = GetFileIconVirtualDom.getFileIconVirtualDom(icon)
  expect(result).toEqual({
    type: VirtualDomElements.Img,
    className: ClassNames.FileIcon,
    src: icon,
    role: AriaRoles.None,
    childCount: 0,
  })
})

test('handles empty icon path', () => {
  const icon = ''
  const result = GetFileIconVirtualDom.getFileIconVirtualDom(icon)
  expect(result).toEqual({
    type: VirtualDomElements.Img,
    className: ClassNames.FileIcon,
    src: '',
    role: AriaRoles.None,
    childCount: 0,
  })
})

test('preserves icon path in src attribute', () => {
  const icon = '/custom/path/file-icon.svg'
  const result = GetFileIconVirtualDom.getFileIconVirtualDom(icon)
  expect(result.src).toBe('/custom/path/file-icon.svg')
})
