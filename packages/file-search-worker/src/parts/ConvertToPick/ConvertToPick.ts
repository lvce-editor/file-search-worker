import { emptyMatches } from '../EmptyMatches/EmptyMatches.ts'
import type { Pick } from '../Pick/Pick.ts'

export const convertToPick = (item: string): Pick => {
  return {
    pick: item,
    matches: emptyMatches,
  }
}
