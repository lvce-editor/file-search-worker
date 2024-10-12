import * as Arrays from '../Arrays/Arrays.ts'
import * as Assert from '../Assert/Assert.ts'

/**
 * Do not use directly, use FileSystemHtml.getChildHandles
 * instead which prompts for the required permission to
 * retrieve the child handles
 *
 */
export const getChildHandles = async (handle: FileSystemDirectoryHandle): Promise<FileSystemHandle[]> => {
  Assert.object(handle)
  // @ts-ignore
  const handles = await Arrays.fromAsync(handle.values())
  return handles
}
