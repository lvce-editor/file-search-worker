export const getContentType = (uri: string): string => {
  if (uri.endsWith('.png')) {
    return 'image/png'
  }
  if (uri.endsWith('.svg')) {
    return 'image/svg+xml'
  }
  // TODO support more
  return ''
}
