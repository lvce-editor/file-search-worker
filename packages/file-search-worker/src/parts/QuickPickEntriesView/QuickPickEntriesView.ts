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

export const selectPick = async (item: any) => {
  // Command.execute(/* openView */ 549, /* viewName */ item.label)
  // return {
  //   command: QuickPickReturnValue.Hide,
  // }
}

export const getFilterValue = (value: any) => {
  return value
}
