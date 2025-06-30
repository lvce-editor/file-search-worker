import { expect, test } from '@jest/globals'
import * as QuickPickStrings from '../src/parts/QuickPickStrings/QuickPickStrings.ts'
import * as UiStrings from '../src/parts/UiStrings/UiStrings.ts'

test('files returns string', () => {
  expect(QuickPickStrings.files()).toBe('Files')
})

test('goToFile returns string', () => {
  expect(QuickPickStrings.goToFile()).toBe('Go to file')
})

test('noMatchingColorThemesFound returns string', () => {
  expect(QuickPickStrings.noMatchingColorThemesFound()).toBe('No matching color themes found')
})

test('noMatchingResults returns string', () => {
  expect(QuickPickStrings.noMatchingResults()).toBe('No matching results')
})

test('noRecentlyOpenedFoldersFound returns string', () => {
  expect(QuickPickStrings.noRecentlyOpenedFoldersFound()).toBe('No recently opened folders found')
})

test('noResults returns string', () => {
  expect(QuickPickStrings.noResults()).toBe('No Results')
})

test('noSymbolFound returns string', () => {
  expect(QuickPickStrings.noSymbolFound()).toBe('No symbol found')
})

test('noWorkspaceSymbolsFound returns string', () => {
  expect(QuickPickStrings.noWorkspaceSymbolsFound()).toBe('no workspace symbols found')
})

test('openRecent returns string', () => {
  expect(QuickPickStrings.openRecent()).toBe('Open Recent')
})

test('selectColorTheme returns string', () => {
  expect(QuickPickStrings.selectColorTheme()).toBe('Select Color Theme')
})

test('selectToOpen returns string', () => {
  expect(QuickPickStrings.selectToOpen()).toBe('Select to open')
})

test('showAndRunCommands returns string', () => {
  expect(QuickPickStrings.showAndRunCommands()).toBe('Show And Run Commands')
})

test('typeNameofCommandToRun returns string', () => {
  expect(QuickPickStrings.typeNameofCommandToRun()).toBe('Type the name of a command to run.')
})

test('typeTheNameOfAViewToOpen returns string', () => {
  expect(QuickPickStrings.typeTheNameOfAViewToOpen()).toBe('Type the name of a view, output channel or terminal to open.')
})

test('quickOpen', () => {
  expect(QuickPickStrings.quickOpen()).toBe(UiStrings.QuickOpen)
})

test('typeTheNameOfACommandToRun', () => {
  expect(QuickPickStrings.typeTheNameOfACommandToRun()).toBe(UiStrings.TypeNameOfCommandToRun)
})

test('goToLineColumn returns string', () => {
  expect(QuickPickStrings.goToLineColumn()).toBe('Go to Line / Column')
})

test('goToSymbolInEditor returns string', () => {
  expect(QuickPickStrings.goToSymbolInEditor()).toBe('Go to Symbol in Editor')
})

test('goToSymbolInWorkspace returns string', () => {
  expect(QuickPickStrings.goToSymbolInWorkspace()).toBe('Go to Symbol in Editor')
})

test('searchForText returns string', () => {
  expect(QuickPickStrings.searchForText()).toBe('Search for text')
})

test('openView returns string', () => {
  expect(QuickPickStrings.openView()).toBe('Open View')
})
