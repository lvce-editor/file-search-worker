export interface VisibleItem {
  readonly description: string
  readonly fileIcon: string
  readonly icon: string
  readonly isActive: boolean
  readonly label: string
  readonly matches: readonly number[]
  readonly posInSet: number
  readonly setSize: number
}
