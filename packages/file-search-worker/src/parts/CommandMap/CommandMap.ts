import * as Create2 from '../Create2/Create2.ts'
import * as Create from '../Create/Create.ts'
import * as FileSystemFetch from '../FileSystemFetch/FileSystemFetch.ts'
import * as FileSystemMemory from '../FileSystemMemory/FileSystemMemory.ts'
import * as FilterQuickPickItems from '../FilterQuickPickItems/FilterQuickPickItems.ts'
import * as FocusIndex from '../FocusIndex/FocusIndex.ts'
import * as FocusNext from '../FocusNext/FocusNext.ts'
import * as GetCommandIds from '../GetCommandIds/GetCommandIds.ts'
import * as GetKeyBindings from '../GetKeyBindings/GetKeyBindings.ts'
import * as HandleBlur from '../HandleBlur/HandleBlur.ts'
import * as HandleWheel from '../HandleWheel/HandleWheel.ts'
import * as LoadContent from '../LoadContent/LoadContent.ts'
import * as LoadQuickPickEntries from '../LoadQuickPickEntries/LoadQuickPickEntries.ts'
import * as QuickPickEntries from '../QuickPickEntries/QuickPickEntries.ts'
import * as Render from '../Render/Render.ts'
import * as SearchFile from '../SearchFile/SearchFile.ts'
import * as SearchFileWithFetch from '../SearchFileWithFetch/SearchFileWithFetch.ts'
import * as SearchFileWithHtml from '../SearchFileWithHtml/SearchFileWithHtml.ts'
import * as SearchFileWithRipGrep from '../SearchFileWithRipGrep/SearchFileWithRipGrep.ts'
import * as VirtualList from '../VirtualList/VirtualList.ts'
import * as WrapCommand from '../WrapCommand/WrapCommand.ts'

export const commandMap = {
  'QuickPick.create2': Create2.create,
  'QuickPick.focusIndex': WrapCommand.wrapCommand(FocusIndex.focusIndex),
  'QuickPick.focusNext': WrapCommand.wrapCommand(FocusNext.focusNext),
  'QuickPick.getKeyBindings': GetKeyBindings.getKeyBindings,
  'QuickPick.handleBlur': WrapCommand.wrapCommand(HandleBlur.handleBlur),
  'QuickPick.handleWheel': WrapCommand.wrapCommand(HandleWheel.handleWheel),
  'QuickPick.setDeltaY': WrapCommand.wrapCommand(VirtualList.setDeltaY),
  'QuickPick.loadContent': WrapCommand.wrapCommand(LoadContent.loadContent),
  'QuickPick.loadEntries2': QuickPickEntries.load,
  'QuickPick.render': Render.doRender,
  'QuickPick.getCommandIds': GetCommandIds.getCommandIds,
  'SearchFile.filter': FilterQuickPickItems.filterQuickPickItems,
  'SearchFile.searchFile': SearchFile.searchFile,
  'SearchFile.searchFileWithFetch': SearchFileWithFetch.searchFile,
  'SearchFile.searchFileWithHtml': SearchFileWithHtml.searchFile,
  'SearchFile.searchFileWithRipGrep': SearchFileWithRipGrep.searchFile,

  // deprecated
  'QuickPick.create': Create.create,
  'QuickPick.loadEntries': LoadQuickPickEntries.loadQuickPickEntries,
  'FileSystemFetch.chmod': FileSystemFetch.chmod,
  'FileSystemFetch.getBlob': FileSystemFetch.getBlob,
  'FileSystemFetch.mkdir': FileSystemFetch.mkdir,
  'FileSystemFetch.readDirWithFileTypes': FileSystemFetch.readDirWithFileTypes,
  'FileSystemFetch.readFile': FileSystemFetch.readFile,
  'FileSystemFetch.remove': FileSystemFetch.remove,
  'FileSystemFetch.writeFile': FileSystemFetch.writeFile,
  'FileSystemMemory.chmod': FileSystemMemory.chmod,
  'FileSystemMemory.getBlob': FileSystemMemory.getBlob,
  'FileSystemMemory.getBlobUrl': FileSystemMemory.getBlobUrl,
  'FileSystemMemory.getFiles': FileSystemMemory.getFiles,
  'FileSystemMemory.mkdir': FileSystemMemory.mkdir,
  'FileSystemMemory.readDirWithFileTypes': FileSystemMemory.readDirWithFileTypes,
  'FileSystemMemory.readFile': FileSystemMemory.readFile,
  'FileSystemMemory.remove': FileSystemMemory.remove,
  'FileSystemMemory.writeFile': FileSystemMemory.writeFile,
}
