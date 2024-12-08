export const getBaseName = (path: string): string => {
  return path.slice(path.lastIndexOf('/') + 1)
}
