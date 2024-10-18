import * as FileSystemMemory from '../FileSystemMemory/FileSystemMemory.ts'

export const searchFile = async (path: string, value: string) => {
  const files = await FileSystemMemory.getFiles()
  const keys = Object.keys(files)
  return keys
}
