import type { VisibleItem } from '../VisibleItem/VisibleItem.ts'
import * as QuickPickReturnValue from '../QuickPickReturnValue/QuickPickReturnValue.ts'
import * as QuickPickStrings from '../QuickPickStrings/QuickPickStrings.ts'

export const name = 'symbol'

export const getPlaceholder = (): string => {
  return ''
}

export const getNoResults = (): any => {
  return {
    label: QuickPickStrings.noSymbolFound(),
  }
}

export const getPicks = async (): Promise<any[]> => {
  const picks: any = []
  return picks
}

export const getVisibleItems = async (
  picks: readonly any[],
  minLineY: number,
  maxLineY: number,
  focusedIndex: number,
): Promise<readonly VisibleItem[]> => {
  return []
}

export const selectPick = async (item: any): Promise<any> => {
  return {
    command: QuickPickReturnValue.Hide,
  }
}

export const getFilterValue = (value: any): any => {
  return value
}

export const state = {}

export const getPickDescription = (value: any): string => {
  return ''
}

export const isPrepared = (): boolean => {
  return false
}

export const getPickFilterValue = (value: string): string => {
  return value
}

export const getPickLabel = (value: string): string => {
  return value
}

export const getPickIcon = (value: string): string => {
  return ''
}
