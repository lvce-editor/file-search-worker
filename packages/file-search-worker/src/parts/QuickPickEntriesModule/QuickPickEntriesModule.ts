export interface QuickPickEntriesModule {
  readonly state: any
  readonly name: string
  readonly getPlaceholder: () => string
  readonly getHelpEntries: () => string
  readonly getNoResults: () => string
  readonly getPicks: () => Promise<readonly any[]>
  readonly selectPick: (item: any) => Promise<any>
  readonly getFilterValue: (item: any) => string
  readonly getPickFilterValue: (item: any) => string
  readonly getPickDescription: (item: any) => string
  readonly getPickLabel: (item: any) => string
  readonly getPickIcon: (item: any) => string
  readonly isPrepared: () => boolean
}
