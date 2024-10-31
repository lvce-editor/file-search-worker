// TODO high memory usage in idb because of transactionDoneMap

import { openDB } from '../Idb/Idb.ts'
import { state } from '../IndexedDbState/IndexedDbState.ts'

const getHandleDb = async () => {
  // @ts-ignore
  const db = await openDB('handle', state.dbVersion, {
    async upgrade(db: any, oldVersion: any) {
      if (!db.objectStoreNames.contains('file-handles-store')) {
        // @ts-ignore
        const objectStore = await db.createObjectStore('file-handles-store', {})
      }
    },
  })
  return db
}

export const getHandle = async (uri: string) => {
  const handleDb = await getHandleDb()
  const handle = await handleDb.get('file-handles-store', uri)
  return handle
}
