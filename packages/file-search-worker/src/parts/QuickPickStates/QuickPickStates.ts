import type { QuickPickState } from '../QuickPickState/QuickPickState.ts'
import * as ViewletRegistry from '@lvce-editor/viewlet-registry'

export const { get, set, dispose, wrapCommand } = ViewletRegistry.create<QuickPickState>()
