import type { QuickPickEntriesModule } from '../QuickPickEntriesModule/QuickPickEntriesModule.ts'

export const getPickDescription = (provider: QuickPickEntriesModule, pick: any): string => {
  if (provider.getPickDescription) {
    return provider.getPickDescription(pick)
  }
  return ''
}
