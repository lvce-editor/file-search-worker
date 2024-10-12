export const isDataCloneError = (error: any) => {
  return error && error.name === 'DataCloneError'
}
