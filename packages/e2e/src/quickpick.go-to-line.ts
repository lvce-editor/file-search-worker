import { type Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.go-to-line'

export const skip = 1

<<<<<<< HEAD
export const test: Test = async ({ FileSystem, QuickPick, Workspace }) => {
=======
export const test: Test = async ({ Editor, expect, FileSystem, Locator, Main, QuickPick, SideBar, Workspace }) => {
>>>>>>> origin/main
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/a.txt`, 'abc')
  await Workspace.setPath(tmpDir)
  await Main.openUri(`${tmpDir}/a.txt`)
  await QuickPick.open() // TODO open with go to line

  // act
  await QuickPick.setValue(':1')
  // TODO enter a line number and select it

  // assert

  // TODO verify the expected editor position
}
