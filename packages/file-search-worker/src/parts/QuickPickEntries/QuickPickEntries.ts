import * as QuickPickEntryId from '../QuickPickEntryId/QuickPickEntryId.js'
import * as QuickPickEntriesEverything from '../QuickPickEntriesEverything/QuickPickEntriesEverything.ts'
import * as QuickPickEntriesNoop from '../QuickPickEntriesNoop/QuickPickEntriesNoop.ts'
import * as QuickPickEntriesNumber from '../QuickPickEntriesNumber/QuickPickEntriesNumber.ts'
import * as QuickPickEntriesOpenRecent from '../QuickPickEntriesOpenRecent/QuickPickEntriesOpenRecent.ts'
import * as QuickPickEntriesSymbol from '../QuickPickEntriesSymbol/QuickPickEntriesSymbol.ts'
import * as QuickPickEntriesColorTheme from '../QuickPickEntriesColorTheme/QuickPickEntriesColorTheme.ts'
import * as QuickPickEntriesView from '../QuickPickEntriesView/QuickPickEntriesView.ts'
import * as QuickPickEntriesCustom from '../QuickPickEntriesCustom/QuickPickEntriesCustom.ts'

export const load = (moduleId) => {
  switch (moduleId) {
    case QuickPickEntryId.CommandPalette:
    case QuickPickEntryId.File:
    case QuickPickEntryId.EveryThing:
    case QuickPickEntryId.WorkspaceSymbol:
      return QuickPickEntriesEverything
    case QuickPickEntryId.Noop:
      return QuickPickEntriesNoop
    case QuickPickEntryId.Number:
      return QuickPickEntriesNumber
    case QuickPickEntryId.Recent:
      return QuickPickEntriesOpenRecent
    case QuickPickEntryId.ColorTheme:
      return QuickPickEntriesColorTheme
    case QuickPickEntryId.Symbol:
      return QuickPickEntriesSymbol
    case QuickPickEntryId.View:
      return QuickPickEntriesView
    case QuickPickEntryId.Custom:
      return QuickPickEntriesCustom
    default:
      throw new Error(`unknown module "${moduleId}"`)
  }
}