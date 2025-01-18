import * as Arrays from '../Arrays/Arrays.ts'

/**
 * Do not use directly, use FileSystemHtml.getChildHandles
 * instead which prompts for the required permission to
 * retrieve the child handles
 *
 */

// eslint-disable-next-line  @typescript-eslint/prefer-readonly-parameter-types
export const getChildHandles = async (handle: FileSystemDirectoryHandle): Promise<readonly FileSystemHandle[]> => {
  // @ts-ignore
  const handles = await Arrays.fromAsync(handle.values())
  return handles
}
