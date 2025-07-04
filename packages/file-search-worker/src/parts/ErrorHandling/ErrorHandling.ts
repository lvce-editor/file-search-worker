import * as Rpc from '../RendererWorker/RendererWorker.ts'

export const handleError = async (error: any, notify = true, prefix = ''): Promise<void> => {
  console.error(error)
}

export const showErrorDialog = async (error: any): Promise<void> => {
  const code = error.code
  const message = error.message
  const stack = error.stack
  const name = error.name
  const errorInfo = {
    code,
    message,
    stack,
    name,
  }
  await Rpc.showErrorDialog(errorInfo)
}

export const warn = (...args: readonly any[]): void => {
  console.warn(...args)
}
