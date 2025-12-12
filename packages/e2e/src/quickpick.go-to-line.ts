import { type Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.go-to-line'

export const skip = 1

export const test: Test = async ({ FileSystem, QuickPick, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/a.txt`, 'abc')
  await Workspace.setPath(tmpDir)
  await QuickPick.open() // TODO open with go to line

  // act
  // TODO enter a line number and select it

  // assert

  // TODO verify the expected editor position
}
