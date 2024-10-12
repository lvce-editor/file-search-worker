import * as Rpc from '../Rpc/Rpc.ts'

export const invoke = (method: string, ...params: any[]) => {
  return Rpc.invoke('SearchProcess.invoke', method, ...params)
}
