import * as I18NString from '../I18NString/I18NString.ts'

/**
 * @enum {string}
 */
const UiStrings = {
  Files: 'Files',
  GoToFile: 'Go to file',
  NoMatchingColorThemesFound: 'No matching color themes found',
  NoMatchingResults: 'No matching results',
  NoRecentlyOpenedFoldersFound: 'No recently opened folders found',
  NoResults: 'No Results',
  NoSymbolFound: 'No symbol found',
  NoWorkspaceSymbolsFound: 'no workspace symbols found',
  OpenRecent: 'Open Recent',
  SelectColorTheme: 'Select Color Theme',
  SelectToOpen: 'Select to open',
  ShowAndRunCommands: 'Show And Run Commands',
  TypeNameOfCommandToRun: 'Type the name of a command to run.',
  TypeTheNameOfAViewToOpen: 'Type the name of a view, output channel or terminal to open.',
}

export const noMatchingColorThemesFound = (): string => {
  return I18NString.i18nString(UiStrings.NoMatchingColorThemesFound)
}

export const selectColorTheme = (): string => {
  return I18NString.i18nString(UiStrings.SelectColorTheme)
}

export const typeNameofCommandToRun = (): string => {
  return I18NString.i18nString(UiStrings.TypeNameOfCommandToRun)
}

export const showAndRunCommands = (): string => {
  return I18NString.i18nString(UiStrings.ShowAndRunCommands)
}

export const noMatchingResults = (): string => {
  return I18NString.i18nString(UiStrings.NoMatchingResults)
}

export const files = (): string => {
  return I18NString.i18nString(UiStrings.Files)
}

export const goToFile = (): string => {
  return I18NString.i18nString(UiStrings.GoToFile)
}

export const noResults = (): string => {
  return I18NString.i18nString(UiStrings.NoResults)
}

export const selectToOpen = (): string => {
  return I18NString.i18nString(UiStrings.SelectToOpen)
}

export const openRecent = (): string => {
  return I18NString.i18nString(UiStrings.OpenRecent)
}

export const noRecentlyOpenedFoldersFound = (): string => {
  return I18NString.i18nString(UiStrings.NoRecentlyOpenedFoldersFound)
}

export const noSymbolFound = (): string => {
  return I18NString.i18nString(UiStrings.NoSymbolFound)
}

export const noWorkspaceSymbolsFound = (): string => {
  return I18NString.i18nString(UiStrings.NoWorkspaceSymbolsFound)
}

export const typeTheNameOfAViewToOpen = (): string => {
  return I18NString.i18nString(UiStrings.TypeTheNameOfAViewToOpen)
}
