import type { GetPicks } from '../GetPicks/GetPicks.ts'
import type { SelectPick } from '../SelectPick/SelectPick.ts'
import * as GetPicksColorTheme from '../GetPicksColorTheme/GetPicksColorTheme.ts'
import * as GetPicksCommand from '../GetPicksCommand/GetPicksCommand.ts'
import * as GetPicksCustom from '../GetPicksCustom/GetPicksCustom.ts'
import * as GetPicksEverything from '../GetPicksEverything/GetPicksEverything.ts'
import * as GetPicksFile from '../GetPicksFile/GetPicksFile.ts'
import * as GetPicksGoToLine from '../GetPicksGoToLine/GetPicksGoToLine.ts'
import * as GetPicksOpenRecent from '../GetPicksOpenRecent/GetPicksOpenRecent.ts'
import * as GetPicksSymbol from '../GetPicksSymbol/GetPicksSymbol.ts'
import * as GetPicksView from '../GetPicksView/GetPicksView.ts'
import * as GetPicksWorkspaceSymbol from '../GetPicksWorkspaceSymbol/GetPicksWorkspaceSymbol.ts'
import * as QuickPickEntryId from '../QuickPickEntryId/QuickPickEntryId.ts'
import * as SelectPickColorTheme from '../SelectPickColorTheme/SelectPickColorTheme.ts'
import * as SelectPickCommand from '../SelectPickCommand/SelectPickCommand.ts'
import * as SelectPickCustom from '../SelectPickCustom/SelectPickCustom.ts'
import * as SelectPickEverything from '../SelectPickEverything/SelectPickEverything.ts'
import * as SelectPickFile from '../SelectPickFile/SelectPickFile.ts'
import * as SelectPickGoToLine from '../SelectPickGoToLine/SelectPickGoToLine.ts'
import * as SelectPickRecent from '../SelectPickRecent/SelectPickRecent.ts'
import * as SelectPickSymbol from '../SelectPickSymbol/SelectPickSymbol.ts'
import * as SelectPickView from '../SelectPickView/SelectPickView.ts'
import * as SelectPickWorkspaceSymbol from '../SelectPickWorkspaceSymbol/SelectPickWorkspaceSymbol.ts'

export const selectPicks: Record<string, SelectPick> = {
  [QuickPickEntryId.ColorTheme]: SelectPickColorTheme.selectPick,
  [QuickPickEntryId.CommandPalette]: SelectPickEverything.selectPick,
  [QuickPickEntryId.Commands]: SelectPickCommand.selectPick,
  [QuickPickEntryId.Custom]: SelectPickCustom.selectPick,
  [QuickPickEntryId.EveryThing]: SelectPickEverything.selectPick,
  [QuickPickEntryId.File]: SelectPickFile.selectPick,
  [QuickPickEntryId.GoToLine]: SelectPickGoToLine.selectPick,
  [QuickPickEntryId.Recent]: SelectPickRecent.selectPick,
  [QuickPickEntryId.Symbol]: SelectPickSymbol.selectPick,
  [QuickPickEntryId.View]: SelectPickView.selectPick,
  [QuickPickEntryId.WorkspaceSymbol]: SelectPickWorkspaceSymbol.selectPick,
}

export const getPicks: Record<string, GetPicks> = {
  [QuickPickEntryId.ColorTheme]: GetPicksColorTheme.getPicks,
  [QuickPickEntryId.CommandPalette]: GetPicksEverything.getPicks,
  [QuickPickEntryId.Commands]: GetPicksCommand.getPicks,
  [QuickPickEntryId.Custom]: GetPicksCustom.getPicks,
  [QuickPickEntryId.EveryThing]: GetPicksEverything.getPicks,
  [QuickPickEntryId.GoToLine]: GetPicksGoToLine.getPicks,
  [QuickPickEntryId.File]: GetPicksFile.getPicks,
  [QuickPickEntryId.Recent]: GetPicksOpenRecent.getPicks,
  [QuickPickEntryId.Symbol]: GetPicksSymbol.getPicks,
  [QuickPickEntryId.View]: GetPicksView.getPicks,
  [QuickPickEntryId.WorkspaceSymbol]: GetPicksWorkspaceSymbol.getPicks,
}
