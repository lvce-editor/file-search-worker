export const handleError = async (error: any, notify = true, prefix = '') => {
  console.error(error)
}

export const showErrorDialog = async () => {}

export const warn = (...args: any[]) => {
  console.warn(...args)
}
