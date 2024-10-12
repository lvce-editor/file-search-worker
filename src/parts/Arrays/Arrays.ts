// based on https://github.com/microsoft/vscode/blob/c0769274fa136b45799edeccc0d0a2f645b75caf/src/vs/base/common/arrays.ts#L625 (License MIT)

export const insertInto = (array: any, start: any, newItems: any) => {
  const originalLength = array.length
  const newItemsLength = newItems.length
  array.length = originalLength + newItemsLength
  // Move the items after the start index, start from the end so that we don't overwrite any value.
  for (let i = originalLength - 1; i >= start; i--) {
    array[i + newItemsLength] = array[i]
  }

  for (let i = 0; i < newItemsLength; i++) {
    array[i + start] = newItems[i]
  }
}

/**
 * Alternative to the native Array.splice method, it
 * can only support limited number of items due to the maximum call stack size limit.
 */
export const spliceLargeArray = (array: any, start: any, deleteCount: any, newItems: any) => {
  const result = array.splice(start, deleteCount)
  insertInto(array, start, newItems)
  return result
}

export const push = (array: any, newItems: any) => {
  insertInto(array, array.length, newItems)
}

export const last = (array: any) => {
  return array.at(-1)
}

export const first = (array: any) => {
  return array[0]
}

// TODO use this function more often
export const firstIndex = (array: any) => {
  return 0
}

// TODO use this function more often
export const lastIndex = (array: any) => {
  return array.length - 1
}

export const fromAsync = async (asyncIterable: any) => {
  const children: any[] = []
  for await (const value of asyncIterable) {
    children.push(value)
  }
  return children
}
