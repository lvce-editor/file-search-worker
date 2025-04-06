import * as QuickPickEntryId from '../QuickPickEntryId/QuickPickEntryId.ts'
import * as QuickPickPrefix from '../QuickPickPrefix/QuickPickPrefix.ts'

export const getDefaultValue = (uri: string): string => {
  switch (uri) {
    case QuickPickEntryId.EveryThing:
      return QuickPickPrefix.Command
    default:
      return ''
  }
}
