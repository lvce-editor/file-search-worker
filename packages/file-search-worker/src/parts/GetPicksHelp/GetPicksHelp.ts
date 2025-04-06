import type { ProtoVisibleItem } from '../ProtoVisibleItem/ProtoVisibleItem.ts'
import * as DirentType from '../DirentType/DirentType.ts'
import * as QuickPickStrings from '../QuickPickStrings/QuickPickStrings.ts'

export const getPicks = async (): Promise<readonly ProtoVisibleItem[]> => {
  return [
    {
      description: QuickPickStrings.goToFile(),
      direntType: DirentType.None,
      fileIcon: '',
      icon: '',
      label: '...',
      matches: [],
      uri: '',
    },
    {
      description: QuickPickStrings.goToLineColumn(),
      direntType: DirentType.None,
      fileIcon: '',
      icon: '',
      label: ':',
      matches: [],
      uri: '',
    },
    {
      description: QuickPickStrings.goToSymbolInEditor(),
      direntType: DirentType.None,
      fileIcon: '',
      icon: '',
      label: ':',
      matches: [],
      uri: '',
    },
    {
      description: QuickPickStrings.searchForText(),
      direntType: DirentType.None,
      fileIcon: '',
      icon: '',
      label: '%',
      matches: [],
      uri: '',
    },
    {
      description: QuickPickStrings.showAndRunCommands(),
      direntType: DirentType.None,
      fileIcon: '',
      icon: '',
      label: '>',
      matches: [],
      uri: '',
    },
  ]
}
