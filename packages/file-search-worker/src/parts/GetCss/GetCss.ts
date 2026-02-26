export const getCss = (height: number, itemHeight: number): string => {
  return `.QuickPick {
    --ItemHeight: ${itemHeight}px;
    height: ${height}px;
  }`
}
