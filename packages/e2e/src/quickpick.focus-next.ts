import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.focus-next'

export const skip = 1

export const test: Test = async ({ Locator, expect, QuickPick, Command }) => {
  // arrange
  await QuickPick.open()
  await QuickPick.setValue('> Layout')

  // act
  // await Command.execute('QuickPick.selectIndex', 0)

  // assert
  // const dialogContent = Locator('.DialogContent')
  // await expect(dialogContent).toBeVisible()
  // const infoIcon = dialogContent.locator('.DialogInfoIcon')
  // await expect(infoIcon).toBeVisible()
}
