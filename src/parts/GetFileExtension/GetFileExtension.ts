import * as Character from '../Character/Character.ts'
import * as Assert from '../Assert/Assert.ts'

const getFileExtensionIndex = (file: string) => {
  Assert.string(file)
  return file.lastIndexOf(Character.Dot)
}

export const getFileExtension = (file: string) => {
  const index = getFileExtensionIndex(file)
  return file.slice(index)
}
