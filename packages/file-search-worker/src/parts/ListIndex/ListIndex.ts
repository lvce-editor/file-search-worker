export const first = (): number => {
  return 0
}

export const last = (items: readonly any[]): number => {
  return items.length - 1
}

export const next = (items: readonly any[], index: number): number => {
  return (index + 1) % items.length
}

export const nextNoCycle = (items: readonly any[], index: number): number => {
  if (index === items.length - 1) {
    return index
  }
  return index + 1
}

export const previous = (items: readonly any[], index: number): number => {
  return index === 0 ? items.length - 1 : index - 1
}

export const previousNoCycle = (items: readonly any[], index: number): number => {
  return index === 0 ? 0 : index - 1
}
