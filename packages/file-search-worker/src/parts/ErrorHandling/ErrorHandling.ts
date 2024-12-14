export const logError = async (error: any, prefix = '') => {
  console.error(error)
}

export const handleError = async (error: any, notify = true, prefix = '') => {
  console.error(error)
}

export const showErrorDialog = async (error: any) => {}

export const warn = (...args: any[]) => {
  console.warn(...args)
}
