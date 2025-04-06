import * as QuickPickEntryId from '../QuickPickEntryId/QuickPickEntryId.ts'
import * as QuickPickEntryUri from '../QuickPickEntryUri/QuickPickEntryUri.ts'

export const getQuickPickProviderId = (prefix: string): number => {
  switch (prefix) {
    case QuickPickEntryUri.Commands:
    case QuickPickEntryUri.Symbol:
    case QuickPickEntryUri.WorkspaceSymbol:
    case QuickPickEntryUri.EveryThing:
    case QuickPickEntryUri.GoToLine:
    case QuickPickEntryUri.View:
    case QuickPickEntryUri.Help:
      return QuickPickEntryId.EveryThing
    case QuickPickEntryUri.ColorTheme:
      return QuickPickEntryId.ColorTheme
    case QuickPickEntryUri.Recent:
      return QuickPickEntryId.Recent
    default:
      return QuickPickEntryId.File
  }
}
