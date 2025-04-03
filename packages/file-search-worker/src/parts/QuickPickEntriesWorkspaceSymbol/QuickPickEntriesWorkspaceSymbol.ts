import type { VisibleItem } from '../VisibleItem/VisibleItem.ts'
import * as QuickPickReturnValue from '../QuickPickReturnValue/QuickPickReturnValue.ts'
import * as ViewletQuickPickStrings from '../QuickPickStrings/QuickPickStrings.ts'

export const name = 'workspace-symbol'

export const getPlaceholder = (): string => {
  return ''
}

export const getNoResults = (): any => {
  return {
    label: ViewletQuickPickStrings.noWorkspaceSymbolsFound(),
  }
}

export const getPicks = async (): Promise<any[]> => {
  const picks: any[] = []
  return picks
}

export const selectPick = async (item: any): Promise<any> => {
  return {
    command: QuickPickReturnValue.Hide,
  }
}

export const getFilterValue = (value: any): string => {
  return value
}

export const getVisibleItems = async (
  minLineY: number,
  maxLineY: number,
  focusedIndex: number,
  searchValue: string,
): Promise<readonly VisibleItem[]> => {
  const filterValue = getFilterValue(searchValue)
  if (!filterValue) {
    return []
  }
  const picks = await getPicks()
  const visibleItems = picks.slice(minLineY, maxLineY + 1).map((pick: any, index: number) => ({
    description: '',
    fileIcon: '',
    icon: '',
    isActive: index + minLineY === focusedIndex,
    label: pick.label || '',
    matches: [],
    posInSet: index + minLineY + 1,
    setSize: picks.length,
  }))
  return visibleItems
}
