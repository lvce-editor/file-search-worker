import type { QuickPickEntriesModule } from '../QuickPickEntriesModule/QuickPickEntriesModule.ts'
import * as QuickPickEntriesColorTheme from '../QuickPickEntriesColorTheme/QuickPickEntriesColorTheme.ts'
import * as QuickPickEntriesCustom from '../QuickPickEntriesCustom/QuickPickEntriesCustom.ts'
import * as QuickPickEntriesEverything from '../QuickPickEntriesEverything/QuickPickEntriesEverything.ts'
import * as QuickPickEntriesNumber from '../QuickPickEntriesNumber/QuickPickEntriesNumber.ts'
import * as QuickPickEntriesOpenRecent from '../QuickPickEntriesOpenRecent/QuickPickEntriesOpenRecent.ts'
import * as QuickPickEntriesSymbol from '../QuickPickEntriesSymbol/QuickPickEntriesSymbol.ts'
import * as QuickPickEntriesView from '../QuickPickEntriesView/QuickPickEntriesView.ts'
import * as QuickPickEntryId from '../QuickPickEntryId/QuickPickEntryId.ts'

export const quickPickEntriesModules: Record<string, QuickPickEntriesModule> = {
  [QuickPickEntryId.CommandPalette]: QuickPickEntriesEverything,
  [QuickPickEntryId.Commands]: QuickPickEntriesEverything,
  [QuickPickEntryId.File]: QuickPickEntriesEverything,
  [QuickPickEntryId.EveryThing]: QuickPickEntriesEverything,
  [QuickPickEntryId.WorkspaceSymbol]: QuickPickEntriesEverything,
  [QuickPickEntryId.Number]: QuickPickEntriesNumber,
  [QuickPickEntryId.Recent]: QuickPickEntriesOpenRecent,
  [QuickPickEntryId.ColorTheme]: QuickPickEntriesColorTheme,
  [QuickPickEntryId.Symbol]: QuickPickEntriesSymbol,
  [QuickPickEntryId.View]: QuickPickEntriesView,
  [QuickPickEntryId.Custom]: QuickPickEntriesCustom,
}
