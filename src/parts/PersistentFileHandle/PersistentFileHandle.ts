import * as Command from '../Command/Command.ts'
import { VError } from '../VError/VError.ts'

export const getHandle = async (uri: string) => {
  try {
    // TODO retrieve handle from state or from indexeddb
    // TODO if not found, throw error
    const handle = await Command.execute('IndexedDb.getHandle', uri)
    return handle
  } catch (error) {
    throw new VError(error, 'Failed to get handle')
  }
}
