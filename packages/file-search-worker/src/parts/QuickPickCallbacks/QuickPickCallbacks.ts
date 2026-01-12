import * as Id from '../Id/Id.ts'

const callbacks: Record<number, any> = Object.create(null)

interface CallbackResult {
  readonly id: number
  readonly promise: Promise<void>
}

export const registerCallback = (): CallbackResult => {
  const id = Id.create()
  const { promise, resolve } = Promise.withResolvers<void>()
  callbacks[id] = resolve
  return {
    id,
    promise,
  }
}

export const executeCallback = (id: number): void => {
  const fn = callbacks[id]
  delete callbacks[id]
  fn()
}
