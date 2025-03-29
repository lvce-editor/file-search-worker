export interface VisibleItem {
  readonly label: string
  readonly description: string
  readonly icon: string
  readonly fileIcon: string
  readonly posInSet: number
  readonly setSize: number
  readonly isActive: boolean
  readonly matches: readonly number[]
}
