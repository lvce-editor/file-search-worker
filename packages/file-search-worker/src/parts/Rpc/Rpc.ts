const state = {
  rpc: undefined,
}

// TODO use rpc registry
export const invoke = (method: string, ...params: readonly any[]): Promise<any> => {
  const rpc = state.rpc
  // @ts-ignore
  return rpc.invoke(method, ...params)
}

export const setRpc = (rpc: any): void => {
  state.rpc = rpc
}
