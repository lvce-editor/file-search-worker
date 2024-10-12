import * as Command from '../Command/Command.ts'
import { VError } from '../VError/VError.ts'

// TODO move state into separate file
const state = {
  handles: Object.create(null),
}

const addHandle = async (uri: string, handle: any) => {
  try {
    // TODO call indexeddb directly instead of using command
    // TODO save handle in indexeddb
    state.handles[uri] = handle
    await Command.execute('IndexedDb.addHandle', uri, handle)
  } catch (error) {
    throw new VError(error, 'Failed to add handle')
  }
}

const addHandles = async (parentUri: string, childHandles: any) => {
  const promises: any[] = []
  for (const childHandle of childHandles) {
    const childUri = parentUri + '/' + childHandle.name
    if (childUri in state.handles) {
      continue
    }
    state.handles[childUri] = childHandle
    promises.push(addHandle(childUri, childHandle))
  }
  await Promise.all(promises)
}

const removeHandle = () => {
  // TODO remove handle from state and from indexeddb
}

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
