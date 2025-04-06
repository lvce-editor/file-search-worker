import type { ProtoVisibleItem } from '../ProtoVisibleItem/ProtoVisibleItem.ts'

export const getVisible = (items: readonly any[], minLineY: number, maxLineY: number, icons: readonly string[]): readonly ProtoVisibleItem[] => {
  const range = items.slice(minLineY, maxLineY)
  const protoVisibleItems = range.map((item, index) => {
    return {
      ...item,
      fileIcon: icons[index],
    }
  })
  return protoVisibleItems
}
