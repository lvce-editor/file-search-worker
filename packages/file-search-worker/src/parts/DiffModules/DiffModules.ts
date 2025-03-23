import * as DiffFocus from '../DiffFocus/DiffFocus.ts'
import * as DiffFocusedIndex from '../DiffFocusedIndex/DiffFocusedIndex.ts'
import * as DiffHeight from '../DiffHeight/DiffHeight.ts'
import * as DiffItems from '../DiffItems/DiffItems.ts'
import * as DiffValue from '../DiffValue/DiffValue.ts'

export const modules = [DiffHeight, DiffItems, DiffFocus, DiffValue, DiffFocusedIndex]

export const numbers = [DiffHeight.diffType, DiffItems.diffType, DiffFocus.diffType, DiffValue.diffType, DiffFocusedIndex.diffType]
