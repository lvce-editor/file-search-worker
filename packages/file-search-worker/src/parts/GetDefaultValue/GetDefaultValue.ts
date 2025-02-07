export const getDefaultValue = (uri: string): string => {
  switch (uri) {
    case 'quickPick://everything':
      return '>'
    default:
      return ''
  }
}
