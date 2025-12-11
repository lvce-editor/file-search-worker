import * as ViewletRegistry from '@lvce-editor/viewlet-registry'
import type { QuickPickState } from '../QuickPickState/QuickPickState.ts'

export const { dispose, get, set, wrapCommand } = ViewletRegistry.create<QuickPickState>()
