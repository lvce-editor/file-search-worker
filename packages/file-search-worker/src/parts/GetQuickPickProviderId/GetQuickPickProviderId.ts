import * as QuickPickEntryId from '../QuickPickEntryId/QuickPickEntryId.ts'
import * as QuickPickPrefix from '../QuickPickPrefix/QuickPickPrefix.ts'

// TODO use numeric enum for quickpick entry id
export const getQuickPickProviderId = (prefix: string): string => {
  switch (prefix) {
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
