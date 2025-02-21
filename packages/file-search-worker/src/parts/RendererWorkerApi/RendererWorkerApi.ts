export interface RendererWorkerApi {
  readonly 'ClipBoard.writeText': (text: string) => Promise<void>
  readonly 'ContextMenu.show': (x: number, y: number, id: any, ...args: readonly any[]) => Promise<void>
  readonly 'Focus.setFocus': (focusKey: number) => Promise<void>
  readonly 'IconTheme.getFileIcon': (options: any) => Promise<string>
  readonly 'IconTheme.getFolderIcon': (options: any) => Promise<string>
  readonly 'Main.openUri': (uri: string, focus?: boolean, props?: any) => Promise<void>
  readonly 'SearchProcess.invoke': (command: string, options: any, ...args: readonly any[]) => Promise<any>
  readonly 'Workspace.setPath': (uri: string) => Promise<void>
  readonly 'Workspace.getPath': () => Promise<string>
  readonly 'RecentlyOpened.getRecentlyOpened': () => Promise<readonly string[]>
  readonly 'ExtensionHost.executeCommand': (id: string) => Promise<void>
  readonly 'Viewlet.closeWidget': (id: string) => Promise<void>
  readonly 'ColorTheme.setColorTheme': (id: string) => Promise<void>
  readonly 'ExtensionHost.getCommands': () => Promise<readonly any[]>
  readonly 'ColorTheme.getColorThemeNames': () => Promise<readonly string[]>
}
