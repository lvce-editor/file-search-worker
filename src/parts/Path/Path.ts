export const dirname = (pathSeparator: string, path: string) => {
  const index = path.lastIndexOf(pathSeparator)
  if (index === -1) {
    return path
  }
  return path.slice(0, index)
}
