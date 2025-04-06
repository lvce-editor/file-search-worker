import type { GetPicks } from '../GetPicks/GetPicks.ts'
import type { SelectPick } from '../SelectPick/SelectPick.ts'

const select: Record<number, SelectPick> = Object.create(null)

const getPick: Record<number, GetPicks> = Object.create(null)

export const registerSelect = (modules: Record<number, SelectPick>): void => {
  Object.assign(select, modules)
}

export const registerGetPick = (modules: Record<number, GetPicks>): void => {
  Object.assign(getPick, modules)
}

export const getPicks = (id: number): GetPicks => {
  const fn = getPick[id]
  return fn
}

export const getSelect = (id: number): SelectPick => {
  const fn = select[id]
  return fn
}
