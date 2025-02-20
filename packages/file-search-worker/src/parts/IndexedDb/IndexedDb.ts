// TODO high memory usage in idb because of transactionDoneMap

import type { IDBPDatabase } from 'idb'
import { openDB } from '../Idb/Idb.ts'
import { state } from '../IndexedDbState/IndexedDbState.ts'

const getHandleDb = async (): Promise<IDBPDatabase<unknown>> => {
  // @ts-ignore
  const db = await openDB('handle', state.dbVersion, {
    async upgrade(db: any): Promise<void> {
      if (!db.objectStoreNames.contains('file-handles-store')) {
        await db.createObjectStore('file-handles-store', {})
      }
    },
  })
  return db
}

export const getHandle = async (uri: string): Promise<any> => {
  const handleDb = await getHandleDb()
  const handle = await handleDb.get('file-handles-store', uri)
  return handle
}
