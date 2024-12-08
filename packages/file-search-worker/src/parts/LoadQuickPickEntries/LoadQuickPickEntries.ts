import * as QuickPickEntriesOpenRecent from '../QuickPickEntriesOpenRecent/QuickPickEntriesOpenRecent.ts'
import * as QuickPickEntryId from '../QuickPickEntryId/QuickPickEntryId.ts'

export const loadQuickPickEntries = (moduleId: string): any => {
  switch (moduleId) {
    case QuickPickEntryId.Recent:
      return QuickPickEntriesOpenRecent
    default:
      throw new Error(`unknown module "${moduleId}"`)
  }
}
