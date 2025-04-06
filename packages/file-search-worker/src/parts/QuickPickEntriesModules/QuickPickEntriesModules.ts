import type { QuickPickEntriesModule } from '../QuickPickEntriesModule/QuickPickEntriesModule.ts'
import * as GetPicksColorTheme from '../GetPicksColorTheme/GetPicksColorTheme.ts'
import * as GetPicksFile from '../GetPicksFile/GetPicksFile.ts'
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
import * as SelectPickColorTheme from '../SelectPickColorTheme/SelectPickColorTheme.ts'
import * as SelectPickCommand from '../SelectPickCommand/SelectPickCommand.ts'
import * as SelectPickCustom from '../SelectPickCustom/SelectPickCustom.ts'
import * as SelectPickEverything from '../SelectPickEverything/SelectPickEverything.ts'
import * as SelectPickFile from '../SelectPickFile/SelectPickFile.ts'
import * as SelectPickRecent from '../SelectPickRecent/SelectPickRecent.ts'
import * as SelectPickSymbol from '../SelectPickSymbol/SelectPickSymbol.ts'
import * as SelectPickWorkspaceSymbol from '../SelectPickWorkspaceSymbol/SelectPickWorkspaceSymbol.ts'

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

export const selectPicks: Record<string, QuickPickEntriesModule['selectPick']> = {
  [QuickPickEntryId.ColorTheme]: SelectPickColorTheme.selectPick,
  [QuickPickEntryId.CommandPalette]: SelectPickEverything.selectPick,
  [QuickPickEntryId.Commands]: SelectPickCommand.selectPick,
  [QuickPickEntryId.Custom]: SelectPickCustom.selectPick,
  [QuickPickEntryId.EveryThing]: SelectPickEverything.selectPick,
  [QuickPickEntryId.File]: SelectPickFile.selectPick,
  [QuickPickEntryId.Recent]: SelectPickRecent.selectPick,
  [QuickPickEntryId.Symbol]: SelectPickSymbol.selectPick,
  [QuickPickEntryId.WorkspaceSymbol]: SelectPickWorkspaceSymbol.selectPick,
}

export const getPicks: Record<string, QuickPickEntriesModule['getPicks']> = {
  [QuickPickEntryId.ColorTheme]: GetPicksColorTheme.getPicks,
  [QuickPickEntryId.File]: GetPicksFile.getPicks,
}
