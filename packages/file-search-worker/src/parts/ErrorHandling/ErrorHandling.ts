export const handleError = async (error: any, notify = true, prefix = ''): Promise<void> => {
  console.error(error)
}

export const showErrorDialog = async (): Promise<void> => {}

export const warn = (...args: any[]): void => {
  console.warn(...args)
}
