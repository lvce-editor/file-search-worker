import { EditorWorker, RendererWorker } from '@lvce-editor/rpc-registry'
import type { ProtoVisibleItem } from '../ProtoVisibleItem/ProtoVisibleItem.ts'
import * as DirentType from '../DirentType/DirentType.ts'

const getText = async (): Promise<string> => {
  // TODO
  const id = await RendererWorker.getActiveEditorId()
  const lines = await EditorWorker.getLines(id)
  return lines.join('\n')
}

const toPick = (column: number): ProtoVisibleItem => {
  return {
    description: '',
    direntType: DirentType.None,
    fileIcon: '',
    icon: '',
    label: `${column}`,
    matches: [],
    uri: '',
  }
}

export const getPicks = async (value: string): Promise<readonly ProtoVisibleItem[]> => {
  if (value.startsWith('::')) {
    const text = await getText()
    const columns = [...Array(text.length)]
    const picks: readonly ProtoVisibleItem[] = columns.map(toPick)
    return picks
  }
  const picks: readonly ProtoVisibleItem[] = [
    {
      description: '',
      direntType: DirentType.None,
      fileIcon: '',
      icon: '',
      label: '1',
      matches: [],
      uri: '',
    },
    {
      description: '',
      direntType: DirentType.None,
      fileIcon: '',
      icon: '',
      label: '2',
      matches: [],
      uri: '',
    },
    {
      description: '',
      direntType: DirentType.None,
      fileIcon: '',
      icon: '',
      label: '3',
      matches: [],
      uri: '',
    },
    {
      description: '',
      direntType: DirentType.None,
      fileIcon: '',
      icon: '',
      label: '4',
      matches: [],
      uri: '',
    },
    {
      description: '',
      direntType: DirentType.None,
      fileIcon: '',
      icon: '',
      label: '5',
      matches: [],
      uri: '',
    },
    {
      description: '',
      direntType: DirentType.None,
      fileIcon: '',
      icon: '',
      label: '6',
      matches: [],
      uri: '',
    },
  ]
  return picks
}
