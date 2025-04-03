import type { VisibleItem } from '../VisibleItem/VisibleItem.ts'
import * as ViewletQuickPickStrings from '../QuickPickStrings/QuickPickStrings.ts'

// TODO probably not needed

export const getPlaceholder = (): any => {
  return ViewletQuickPickStrings.typeNameofCommandToRun()
}

export const getHelpEntries = (): any => {
  return undefined
}

export const getPicks = async (): Promise<any> => {
  // const views = ViewService.getViews()
  // const picks = views.map(toPick)
  // return picks
  return []
}

export const selectPick = async (item: any): Promise<any> => {
  // Command.execute(/* openView */ 549, /* viewName */ item.label)
  // return {
  //   command: QuickPickReturnValue.Hide,
  // }
}

export const getFilterValue = (value: any): string => {
  return value
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

export const state = {}

export const getNoResults = (): string => {
  return ''
}

export const name = ''

export const isPrepared = (): boolean => {
  return true
}

export const getPickDescription = (): string => {
  return ''
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
    description: getPickDescription(),
    fileIcon: '',
    icon: getPickIcon(pick),
    isActive: index + minLineY === focusedIndex,
    label: getPickLabel(pick),
    matches: [],
    posInSet: index + minLineY + 1,
    setSize: picks.length,
  }))
  return visibleItems
}
