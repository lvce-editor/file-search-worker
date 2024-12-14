import * as AssetDir from '../AssetDir/AssetDir.ts'
import * as Command from '../Command/Command.ts'
import * as Platform from '../Platform/Platform.ts'
import * as PlatformType from '../PlatformType/PlatformType.ts'
import * as SharedProcess from '../SharedProcess/SharedProcess.ts'

export const getColorThemeNames = async (): Promise<any[]> => {
  if (Platform.platform === PlatformType.Web) {
    const url = `${AssetDir.assetDir}/config/themes.json`
    return Command.execute(/* Ajax.getJson */ 'Ajax.getJson', /* url */ url)
  }
  return SharedProcess.invoke(/* ExtensionHost.getColorThemeNames */ 'ExtensionHost.getColorThemeNames')
}
