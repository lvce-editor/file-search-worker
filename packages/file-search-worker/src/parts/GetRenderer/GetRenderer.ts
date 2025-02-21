import type { Renderer } from '../Renderer/Renderer.ts'
import * as DiffType from '../DiffType/DiffType.ts'
import * as RenderCursorOffset from '../RenderCursorOffset/RenderCursorOffset.ts'
import * as RenderFocus from '../RenderFocus/RenderFocus.ts'
import * as RenderFocusedIndex from '../RenderFocusedIndex/RenderFocusedIndex.ts'
import * as RenderHeight from '../RenderHeight/RenderHeight.ts'
import * as RenderItems from '../RenderItems/RenderItems.ts'
import * as RenderValue from '../RenderValue/RenderValue.ts'

export const getRenderer = (diffType: number): Renderer => {
  switch (diffType) {
    case DiffType.RenderValue:
      return RenderValue.renderValue
    case DiffType.RenderCursorOffset:
      return RenderCursorOffset.renderCursorOffset
    case DiffType.RenderItems:
      return RenderItems.renderItems
    case DiffType.RenderFocusedIndex:
      return RenderFocusedIndex.renderFocusedIndex
    case DiffType.Height:
      return RenderHeight.renderHeight
    case DiffType.RenderFocus:
      return RenderFocus.renderFocus
    default:
      throw new Error('unknown renderer')
  }
}
