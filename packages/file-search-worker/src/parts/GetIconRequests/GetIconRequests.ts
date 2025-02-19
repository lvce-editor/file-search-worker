import type { IconRequest } from '../IconRequest/IconRequest.ts'

export const getIconRequests = (items: readonly any[], provider: any): readonly IconRequest[] => {
  const iconRequests: IconRequest[] = []
  for (let i = 0; i < items.length; i++) {
    const pick = items[i]
    const icon = provider.getPickIcon(pick)
    iconRequests.push({
      name: icon,
      path: '',
      type: 1,
    })
  }
  return iconRequests
}
