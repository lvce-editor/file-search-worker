import * as QuickPickStrings from '../QuickPickStrings/QuickPickStrings.ts'

export const getPlaceholderValue = (providerId: string): string => {
  switch (providerId) {
    case 'command':
      return QuickPickStrings.typeNameofCommandToRun()
    case 'colorTheme':
      return QuickPickStrings.selectColorTheme()
    case 'openRecent':
      return QuickPickStrings.selectToOpen()
    case 'view':
      return QuickPickStrings.typeNameofCommandToRun()
    default:
      return ''
  }
}
