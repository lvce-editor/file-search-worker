import type { QuickPickEntriesModule } from '../QuickPickEntriesModule/QuickPickEntriesModule.ts'
import * as QuickPickEntriesColorTheme from '../QuickPickEntriesColorTheme/QuickPickEntriesColorTheme.ts'
import * as QuickPickEntriesCommand from '../QuickPickEntriesCommand/QuickPickEntriesCommand.ts'
import * as QuickPickEntriesCustom from '../QuickPickEntriesCustom/QuickPickEntriesCustom.ts'
import * as QuickPickEntriesEverything from '../QuickPickEntriesEverything/QuickPickEntriesEverything.ts'
import * as QuickPickEntriesFile from '../QuickPickEntriesFile/QuickPickEntriesFile.ts'
import * as QuickPickEntriesOpenRecent from '../QuickPickEntriesOpenRecent/QuickPickEntriesOpenRecent.ts'
import * as QuickPickEntriesSymbol from '../QuickPickEntriesSymbol/QuickPickEntriesSymbol.ts'
import * as QuickPickEntriesView from '../QuickPickEntriesView/QuickPickEntriesView.ts'
import * as QuickPickEntriesWorkspaceSymbol from '../QuickPickEntriesWorkspaceSymbol/QuickPickEntriesWorkspaceSymbol.ts'
import * as QuickPickEntryId from '../QuickPickEntryId/QuickPickEntryId.ts'

export const quickPickEntriesModules: Record<string, QuickPickEntriesModule> = {
  [QuickPickEntryId.ColorTheme]: QuickPickEntriesColorTheme,
  [QuickPickEntryId.CommandPalette]: QuickPickEntriesEverything,
  [QuickPickEntryId.Commands]: QuickPickEntriesCommand,
  [QuickPickEntryId.Custom]: QuickPickEntriesCustom,
  [QuickPickEntryId.EveryThing]: QuickPickEntriesEverything,
  [QuickPickEntryId.File]: QuickPickEntriesFile,
  [QuickPickEntryId.Recent]: QuickPickEntriesOpenRecent,
  [QuickPickEntryId.Symbol]: QuickPickEntriesSymbol,
  [QuickPickEntryId.View]: QuickPickEntriesView,
  [QuickPickEntryId.WorkspaceSymbol]: QuickPickEntriesWorkspaceSymbol,
}
