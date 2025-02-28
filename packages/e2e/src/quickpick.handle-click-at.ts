import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.handle-click-at'

export const test: Test = async ({ Locator, expect, QuickPick }) => {
  // arrange
  await QuickPick.open()
  await QuickPick.setValue('About')

  // assert
}
