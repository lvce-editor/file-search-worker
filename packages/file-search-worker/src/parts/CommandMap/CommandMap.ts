import * as FileSystemFetch from '../FileSystemFetch/FileSystemFetch.ts'
import * as FileSystemMemory from '../FileSystemMemory/FileSystemMemory.ts'
import * as FilterQuickPickItems from '../FilterQuickPickItems/FilterQuickPickItems.ts'
import * as GetKeyBindings from '../GetKeyBindings/GetKeyBindings.ts'
import * as LoadQuickPickEntries from '../LoadQuickPickEntries/LoadQuickPickEntries.ts'
import * as QuickPickEntries from '../QuickPickEntries/QuickPickEntries.ts'
import * as SearchFile from '../SearchFile/SearchFile.ts'
import * as SearchFileWithFetch from '../SearchFileWithFetch/SearchFileWithFetch.ts'
import * as SearchFileWithHtml from '../SearchFileWithHtml/SearchFileWithHtml.ts'
import * as SearchFileWithRipGrep from '../SearchFileWithRipGrep/SearchFileWithRipGrep.ts'

export const commandMap = {
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
  'QuickPick.getKeyBindings': GetKeyBindings.getKeyBindings,
  'QuickPick.loadEntries': LoadQuickPickEntries.loadQuickPickEntries,
  'QuickPick.loadEntries2': QuickPickEntries.load,
  'SearchFile.filter': FilterQuickPickItems.filterQuickPickItems,
  'SearchFile.searchFile': SearchFile.searchFile,
  'SearchFile.searchFileWithFetch': SearchFileWithFetch.searchFile,
  'SearchFile.searchFileWithHtml': SearchFileWithHtml.searchFile,
  'SearchFile.searchFileWithRipGrep': SearchFileWithRipGrep.searchFile,
}
