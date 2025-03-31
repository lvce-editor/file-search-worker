import type { Pick } from '../Pick/Pick.ts'
import * as EmptyMatches from '../EmptyMatches/EmptyMatches.ts'

export const convertToPick = (item: string): Pick => {
  return {
    pick: item,
    matches: EmptyMatches.emptyMatches,
  }
}
