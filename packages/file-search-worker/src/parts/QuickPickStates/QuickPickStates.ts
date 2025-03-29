import type { QuickPickState } from '../QuickPickState/QuickPickState.ts'
import * as ViewletRegistry from '../ViewletRegistry/ViewletRegistry.ts'

export const { get, set, remove } = ViewletRegistry.create<QuickPickState>()
