export const getFileSearchRipGrepArgs = (): readonly string[] => {
  const ripGrepArgs = ['--files', '--sort-files', '--hidden']
  return ripGrepArgs
}
