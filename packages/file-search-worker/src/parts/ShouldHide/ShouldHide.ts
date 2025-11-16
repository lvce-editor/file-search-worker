const hideIds = ['AutoUpdater.checkForUpdates']

export const shouldHide = (item: any): boolean => {
  if (hideIds.includes(item.id) || (item.id === 'Viewlet.openWidget' && item.args[0] === 'QuickPick')) {
    return false
  }
  return true
}
