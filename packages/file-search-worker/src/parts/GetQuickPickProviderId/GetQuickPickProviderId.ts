import * as QuickPickEntryId from '../QuickPickEntryId/QuickPickEntryId.ts'
import * as QuickPickEntryUri from '../QuickPickEntryUri/QuickPickEntryUri.ts'
import * as QuickPickPrefix from '../QuickPickPrefix/QuickPickPrefix.ts'

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
    case QuickPickPrefix.Command:
      return QuickPickEntryId.Commands
    case QuickPickPrefix.Symbol:
      return QuickPickEntryId.Symbol
    case QuickPickPrefix.WorkspaceSymbol:
      return QuickPickEntryId.WorkspaceSymbol
    case QuickPickPrefix.GoToLine:
      return QuickPickEntryId.GoToLine
    case QuickPickPrefix.View:
      return QuickPickEntryId.View
    case QuickPickPrefix.Help:
      return QuickPickEntryId.Help
    default:
      return QuickPickEntryId.File
  }
}
