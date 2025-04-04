import type { QuickPickEntriesModule } from '../QuickPickEntriesModule/QuickPickEntriesModule.ts'

export const getPickDescription = (provider: QuickPickEntriesModule, pick: any): string => {
  // @ts-ignore
  if (provider.getPickDescription) {
    // @ts-ignore
    return provider.getPickDescription(pick)
  }
  return ''
}
