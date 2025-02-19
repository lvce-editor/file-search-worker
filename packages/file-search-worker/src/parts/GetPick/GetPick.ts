import * as Assert from '../Assert/Assert.ts'

export const getPick = (items: readonly any[], index: number): any => {
  Assert.array(items)
  Assert.number(index)
  // if (index < state.recentPicks.length) {
  //   return state.recentPicks[index]
  // }
  // index -= state.recentPicks.length
  if (index < items.length) {
    return items[index].pick
  }
  console.warn('no pick matching index', index)
}
