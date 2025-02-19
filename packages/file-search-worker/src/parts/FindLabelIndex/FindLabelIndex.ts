export const findLabelIndex = (items: readonly any[], label: string): number => {
  for (let i = 0; i < items.length; i++) {
    if (items[i].pick.label === label) {
      return i
    }
  }
  return -1
}
