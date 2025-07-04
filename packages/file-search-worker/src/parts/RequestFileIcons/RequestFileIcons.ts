import type { IconRequest } from '../IconRequest/IconRequest.ts'
import * as DirentType from '../DirentType/DirentType.ts'
import * as RendererWorker from '../RendererWorker/RendererWorker.ts'

const requestFileIcon = async (request: IconRequest): Promise<string> => {
  if (!request.name) {
    return ''
  }
  return request.type === DirentType.File
    ? RendererWorker.invoke('IconTheme.getFileIcon', { name: request.name })
    : RendererWorker.invoke('IconTheme.getFolderIcon', { name: request.name })
}

export const requestFileIcons = async (requests: readonly IconRequest[]): Promise<readonly string[]> => {
  const promises = requests.map(requestFileIcon)
  return Promise.all(promises)
}
