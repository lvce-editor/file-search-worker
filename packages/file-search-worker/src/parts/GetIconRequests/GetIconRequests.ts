import type { IconRequest } from '../IconRequest/IconRequest.ts'
import * as DirentType from '../DirentType/DirentType.ts'

export const getIconRequests = (items: readonly any[], provider: any): readonly IconRequest[] => {
  const iconRequests: IconRequest[] = []
  console.log({ provider })
  for (let i = 0; i < items.length; i++) {
    const pick = items[i]
    const icon = provider.getPickFileIcon(pick)
    iconRequests.push({
      name: icon,
      path: '',
      type: DirentType.File,
    })
  }
  return iconRequests
}
