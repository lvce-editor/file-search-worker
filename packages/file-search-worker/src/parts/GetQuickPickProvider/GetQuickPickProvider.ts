import * as QuickPickEntriesCommand from '../QuickPickEntriesCommand/QuickPickEntriesCommand.ts'
import * as QuickPickEntriesFile from '../QuickPickEntriesFile/QuickPickEntriesFile.ts'
import * as QuickPickEntriesGoToLine from '../QuickPickEntriesGoToLine/QuickPickEntriesGoToLine.ts'
import * as QuickPickEntriesSymbol from '../QuickPickEntriesSymbol/QuickPickEntriesSymbol.ts'
import * as QuickPickEntriesView from '../QuickPickEntriesView/QuickPickEntriesView.ts'
import * as QuickPickEntriesWorkspaceSymbol from '../QuickPickEntriesWorkspaceSymbol/QuickPickEntriesWorkspaceSymbol.ts'
import * as QuickPickPrefix from '../QuickPickPrefix/QuickPickPrefix.ts'

export const getQuickPickProvider = (prefix: string): any => {
  // TODO could use enum for prefix
  // TODO could use regex to extract prefix
  // TODO or could check first letter char code (less comparisons)
  switch (prefix) {
    case QuickPickPrefix.Command:
      return QuickPickEntriesCommand
    case QuickPickPrefix.Symbol:
      return QuickPickEntriesSymbol
    case QuickPickPrefix.WorkspaceSymbol:
      return QuickPickEntriesWorkspaceSymbol
    case QuickPickPrefix.GoToLine:
      return QuickPickEntriesGoToLine
    case QuickPickPrefix.View:
      return QuickPickEntriesView
    default:
      return QuickPickEntriesFile
  }
}
