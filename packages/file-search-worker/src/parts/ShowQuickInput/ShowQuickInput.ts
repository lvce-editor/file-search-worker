import type { QuickInputOptions } from '../QuickInputOptions/QuickInputOptions.ts'
import type { QuickInputResult } from '../QuickInputResult/QuickInputResult.ts'

export const showQuickInput = async ({ ignoreFocusOut, initialValue }: QuickInputOptions): Promise<QuickInputResult> => {
  // TODO ask renderer worker to create quickpick instance, with given options
  return {
    canceled: false,
    inputValue: '',
  }
}
