import * as QuickPickReturnValue from '../QuickPickReturnValue/QuickPickReturnValue.ts'

export const selectPick = async (item: any): Promise<any> => {
  return {
    command: QuickPickReturnValue.Hide,
  }
}
