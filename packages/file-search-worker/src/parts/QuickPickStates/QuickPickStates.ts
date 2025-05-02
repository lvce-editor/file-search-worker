import * as ViewletRegistry from '@lvce-editor/viewlet-registry'
import type { QuickPickState } from '../QuickPickState/QuickPickState.ts'

export const { get, set, dispose, wrapCommand } = ViewletRegistry.create<QuickPickState>()
