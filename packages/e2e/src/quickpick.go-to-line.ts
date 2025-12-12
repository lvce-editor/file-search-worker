import { type Test } from '@lvce-editor/test-with-playwright'

export const name = 'quickpick.go-to-line'

export const skip = 1

export const test: Test = async ({ Editor, FileSystem, Main, QuickPick, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/a.txt`, 'abc\ndef')
  await Workspace.setPath(tmpDir)
  await Main.openUri(`${tmpDir}/a.txt`)
  await QuickPick.open()
  await QuickPick.setValue(':2')

  // act
  await QuickPick.selectItem('2')

  // assert
  await Editor.shouldHaveSelections(new Uint32Array([2, 0, 2, 0]))
}
