import * as Create2 from '../Create2/Create2.ts'
import * as Dispose from '../Dispose/Dispose.ts'
import * as FilterQuickPickItems from '../FilterQuickPickItems/FilterQuickPickItems.ts'
import * as FocusFirst from '../FocusFirst/FocusFirst.ts'
import * as FocusIndex from '../FocusIndex/FocusIndex.ts'
import * as FocusLast from '../FocusLast/FocusLast.ts'
import * as FocusNext from '../FocusNext/FocusNext.ts'
import * as FocusPrevious from '../FocusPrevious/FocusPrevious.ts'
import * as GetCommandIds from '../GetCommandIds/GetCommandIds.ts'
import * as GetKeyBindings from '../GetKeyBindings/GetKeyBindings.ts'
import * as HandleBeforeInput from '../HandleBeforeInput/HandleBeforeInput.ts'
import * as HandleBlur from '../HandleBlur/HandleBlur.ts'
import * as HandleClickAt from '../HandleClickAt/HandleClickAt.ts'
import * as HandleInput from '../HandleInput/HandleInput.ts'
import * as HandleWheel from '../HandleWheel/HandleWheel.ts'
import * as LoadContent from '../LoadContent/LoadContent.ts'
import * as LoadQuickPickEntries from '../LoadQuickPickEntries/LoadQuickPickEntries.ts'
import * as MenuEntriesState from '../MenuEntriesState/MenuEntriesState.ts'
import * as QuickPickEntries from '../QuickPickEntries/QuickPickEntries.ts'
import * as Render from '../Render/Render.ts'
import * as RenderEventListeners from '../RenderEventListeners/RenderEventListeners.ts'
import * as SearchFile from '../SearchFile/SearchFile.ts'
import * as SelectCurrentIndex from '../SelectCurrentIndex/SelectCurrentIndex.ts'
import * as SelectIndex from '../SelectIndex/SelectIndex.ts'
import * as SelectItem from '../SelectItem/SelectItem.ts'
import * as SetValue from '../SetValue/SetValue.ts'
import * as VirtualList from '../VirtualList/VirtualList.ts'
import * as WrapCommand from '../WrapCommand/WrapCommand.ts'

export const commandMap = {
  'QuickPick.addMenuEntries': MenuEntriesState.add,
  'QuickPick.create2': Create2.create,
  'QuickPick.focusFirst': WrapCommand.wrapCommand(FocusFirst.focusFirst),
  'QuickPick.focusIndex': WrapCommand.wrapCommand(FocusIndex.focusIndex),
  'QuickPick.focusLast': WrapCommand.wrapCommand(FocusLast.focusLast),
  'QuickPick.focusNext': WrapCommand.wrapCommand(FocusNext.focusNext),
  'QuickPick.focusPrevious': WrapCommand.wrapCommand(FocusPrevious.focusPrevious),
  'QuickPick.getCommandIds': GetCommandIds.getCommandIds,
  'QuickPick.getKeyBindings': GetKeyBindings.getKeyBindings,
  'QuickPick.handleBeforeInput': WrapCommand.wrapCommand(HandleBeforeInput.handleBeforeInput),
  'QuickPick.handleBlur': WrapCommand.wrapCommand(HandleBlur.handleBlur),
  'QuickPick.dispose': Dispose.dispose,
  'QuickPick.handleClickAt': WrapCommand.wrapCommand(HandleClickAt.handleClickAt),
  'QuickPick.handleInput': WrapCommand.wrapCommand(HandleInput.handleInput),
  'QuickPick.handleWheel': WrapCommand.wrapCommand(HandleWheel.handleWheel),
  'QuickPick.loadContent': WrapCommand.wrapCommand(LoadContent.loadContent),
  'QuickPick.loadEntries2': QuickPickEntries.load,
  'QuickPick.render': Render.doRender,
  'QuickPick.selectCurrentIndex': WrapCommand.wrapCommand(SelectCurrentIndex.selectCurrentIndex),
  'QuickPick.selectIndex': WrapCommand.wrapCommand(SelectIndex.selectIndex),
  'QuickPick.selectItem': WrapCommand.wrapCommand(SelectItem.selectItem),
  'QuickPick.setDeltaY': WrapCommand.wrapCommand(VirtualList.setDeltaY),
  'QuickPick.setValue': WrapCommand.wrapCommand(SetValue.setValue),
  'QuickPick.renderEventListeners': RenderEventListeners.renderEventListeners,

  // deprecated
  'SearchFile.filter': FilterQuickPickItems.filterQuickPickItems,
  'SearchFile.searchFile': SearchFile.searchFile,
  'QuickPick.loadEntries': LoadQuickPickEntries.loadQuickPickEntries,
}
