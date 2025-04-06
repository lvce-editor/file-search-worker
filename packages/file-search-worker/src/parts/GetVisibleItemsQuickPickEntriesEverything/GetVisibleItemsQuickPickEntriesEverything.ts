import type { QuickPickEntriesModule } from '../QuickPickEntriesModule/QuickPickEntriesModule.ts'
import * as QuickPickNoop from '../QuickPickEntriesNoop/QuickPickNoop.ts'

export const state = {
  provider: QuickPickNoop as any as QuickPickEntriesModule,
  prefix: 'string-that-should-never-match-another-string',
}
