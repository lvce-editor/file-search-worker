import * as FileSystemMemory from '../FileSystemMemory/FileSystemMemory.ts'

export const searchFile = async (): Promise<readonly string[]> => {
  const files = await FileSystemMemory.getFiles()
  const keys = Object.keys(files)
  return keys
}
