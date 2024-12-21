import type { Pick } from '../Pick/Pick.ts'
import { emptyMatches } from '../EmptyMatches/EmptyMatches.ts'

export const convertToPick = (item: string): Pick => {
  return {
    pick: item,
    matches: emptyMatches,
  }
}
