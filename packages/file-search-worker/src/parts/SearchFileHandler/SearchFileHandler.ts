export interface SearchFileHandler {
  (
    path: string,
    value: string,
    prepare: boolean,
    assetDir: string,
    ifNonMatch?: string | null,
  ): Promise<readonly string[] | { readonly hash: string; readonly matchesCache: boolean; readonly results: readonly string[] }>
}
