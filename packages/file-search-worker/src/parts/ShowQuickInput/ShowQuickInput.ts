interface QuickInputOptions {
  readonly ignoreFocusOut?: boolean
  readonly initialValue?: string
  readonly render?: any
}

export const showQuickInput = async ({ ignoreFocusOut, initialValue }: QuickInputOptions): Promise<void> => {
  // TODO ask renderer worker to create quickpick instance, with given options
}
