import type { GetPicks } from '../GetPicks/GetPicks.ts'
import type { SelectPick } from '../SelectPick/SelectPick.ts'

const select: Record<string, SelectPick> = Object.create(null)

const getPick: Record<string, GetPicks> = Object.create(null)

export const registerSelect = (modules: Record<string, SelectPick>): void => {
  Object.assign(select, modules)
}

export const registerGetPick = (modules: Record<string, GetPicks>): void => {
  Object.assign(getPick, modules)
}

export const getPicks = (id: string): GetPicks => {
  const fn = getPick[id]
  return fn
}

export const getSelect = (id: string): SelectPick => {
  const fn = select[id]
  return fn
}
