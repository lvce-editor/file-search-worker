export interface RendererWorkerApi {
  readonly 'ClipBoard.writeText': (text: string) => Promise<void>
  readonly 'ExtensionHost.searchFileWithMemory': (uri: string) => Promise<readonly string[]>
  readonly 'ColorTheme.getColorThemeNames': () => Promise<readonly string[]>
  readonly 'ColorTheme.setColorTheme': (id: string) => Promise<void>
  readonly 'ContextMenu.show': (x: number, y: number, id: any, ...args: readonly any[]) => Promise<void>
  readonly 'ErrorHandling.showErrorDialog': (errorInfo: any) => Promise<void>
  readonly 'ExtensionHost.executeCommand': (id: string) => Promise<void>
  readonly 'ExtensionHost.getCommands': () => Promise<readonly any[]>
  readonly 'ExtensionHost.searchFileWithFetch': (uri: string) => Promise<readonly string[]>
  readonly 'Focus.setFocus': (focusKey: number) => Promise<void>
  readonly 'IconTheme.getFileIcon': (options: any) => Promise<string>
  readonly 'IconTheme.getFolderIcon': (options: any) => Promise<string>
  readonly 'Main.openUri': (uri: string, focus?: boolean, props?: any) => Promise<void>
  readonly 'RecentlyOpened.getRecentlyOpened': () => Promise<readonly string[]>
  readonly 'SearchProcess.invoke': (command: string, ...args: readonly any[]) => Promise<any>
  readonly 'Viewlet.closeWidget': (id: number) => Promise<void>
  readonly 'Viewlet.openWidget': (id: string) => Promise<void>
  readonly 'Workspace.getPath': () => Promise<string>
  readonly 'Workspace.setPath': (uri: string) => Promise<void>
  readonly 'ExtensionHost.searchFileWithHtml': (uri: string) => Promise<readonly string[]>
}
