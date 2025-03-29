import type { IconRequest } from '../IconRequest/IconRequest.ts'
import type { QuickPickEntriesModule } from '../QuickPickEntriesModule/QuickPickEntriesModule.ts'

export const getIconRequests = (items: readonly any[], provider: QuickPickEntriesModule): readonly IconRequest[] => {
  const iconRequests: IconRequest[] = []
  for (let i = 0; i < items.length; i++) {
    const pick = items[i]
    const iconObject = provider?.getPickFileIcon?.(pick) || {}
    iconRequests.push({
      name: iconObject?.name,
      path: '',
      type: iconObject?.type,
    })
  }
  return iconRequests
}
