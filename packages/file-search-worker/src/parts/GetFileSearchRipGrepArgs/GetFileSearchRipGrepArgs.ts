export const getFileSearchRipGrepArgs = (): readonly string[] => {
  const ripGrepArgs = ['--files', '--sort-files', '--hidden', '--glob', '!.git', '--glob', '!elm-stuff']
  return ripGrepArgs
}
