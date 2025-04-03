import type { VisibleItem } from '../VisibleItem/VisibleItem.ts'
import * as GetColorThemeNames from '../GetColorThemeNames/GetColorThemeNames.ts'
import * as QuickPickReturnValue from '../QuickPickReturnValue/QuickPickReturnValue.ts'
import * as QuickPickStrings from '../QuickPickStrings/QuickPickStrings.ts'
import * as Rpc from '../Rpc/Rpc.ts'

export const setColorTheme = (id: string): Promise<void> => {
  return Rpc.invoke(/* ColorTheme.setColorTheme */ 'ColorTheme.setColorTheme', /* colorThemeId */ id)
}

export const getPlaceholder = (): string => {
  return QuickPickStrings.selectColorTheme()
}

export const getLabel = (): string => {
  return QuickPickStrings.selectColorTheme()
}

export const getPicks = async (searchValue: any): Promise<readonly any[]> => {
  const colorThemeNames = await GetColorThemeNames.getColorThemeNames()
  return colorThemeNames
}

export const getVisibleItems = async (
  picks: readonly any[],
  minLineY: number,
  maxLineY: number,
  focusedIndex: number,
  setSize: number,
): Promise<readonly VisibleItem[]> => {
  const visibleItems = picks.slice(minLineY, maxLineY + 1).map((pick, index) => ({
    description: getPickDescription(pick),
    fileIcon: '',
    icon: getPickIcon(pick),
    isActive: index + minLineY === focusedIndex,
    label: getPickLabel(pick),
    matches: [],
    posInSet: index + minLineY + 1,
    setSize,
  }))
  return visibleItems
}

export const selectPick = async (pick: any): Promise<any> => {
  await setColorTheme(/* colorThemeId */ pick)
  return {
    command: QuickPickReturnValue.Hide,
  }
}

export const focusPick = async (pick: any): Promise<void> => {
  await setColorTheme(/* colorThemeId */ pick)
}

export const getFilterValue = (value: any): any => {
  return value
}

export const getNoResults = (): any => {
  return {
    label: QuickPickStrings.noMatchingColorThemesFound(),
  }
}

export const getPickFilterValue = (pick: any): any => {
  return pick
}

export const getPickLabel = (pick: any): string => {
  return pick
}

export const getPickIcon = (pick: any): string => {
  return ''
}

export const state = {}

export const getPickDescription = (value: any): string => {
  return ''
}

export const isPrepared = (): boolean => {
  return false
}

export const name = ''

export const getHelpEntries = (): readonly any[] => {
  return []
}
