import * as QuickPickPrefix from '../QuickPickPrefix/QuickPickPrefix.ts'
import * as ViewletQuickPickStrings from '../QuickPickStrings/QuickPickStrings.ts'

export const getHelpEntries = (providerId: string): readonly any[] => {
  switch (providerId) {
    case QuickPickPrefix.Command:
      return [
        {
          description: ViewletQuickPickStrings.showAndRunCommands(),
          category: 'global commands',
        },
      ]
    case QuickPickPrefix.None:
      return [
        {
          description: ViewletQuickPickStrings.goToFile(),
          category: 'global commands',
        },
      ]
    default:
      return []
  }
}
