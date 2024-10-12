// based on https://github.com/microsoft/vscode/blob/c0769274fa136b45799edeccc0d0a2f645b75caf/src/vs/base/common/arrays.ts#L625 (License MIT)

export const fromAsync = async (asyncIterable: any) => {
  const children: any[] = []
  for await (const value of asyncIterable) {
    children.push(value)
  }
  return children
}
