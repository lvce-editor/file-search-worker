import * as Character from '../Character/Character.ts'

const getFileExtensionIndex = (file: string): number => {
  return file.lastIndexOf(Character.Dot)
}

export const getFileExtension = (file: string): string => {
  const index = getFileExtensionIndex(file)
  return file.slice(index)
}
