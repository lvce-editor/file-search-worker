import type { QuickPickState } from '../QuickPickState/QuickPickState.ts'
import * as InputSource from '../InputSource/InputSource.ts'
import * as MinimumSliderSize from '../MinimumSliderSize/MinimumSliderSize.ts'
import * as QuickPickOpenState from '../QuickPickOpenState/QuickPickOpenState.ts'
import * as QuickPickStates from '../QuickPickStates/QuickPickStates.ts'
import * as VirtualList from '../VirtualList/VirtualList.ts'

export const create = (
  uid: number,
  uri: string,
  listItemHeight: number,
  x: number,
  y: number,
  width: number,
  height: number,
  platform: number,
  args: any,
  workspaceUri: string,
): void => {
  const state: QuickPickState = {
    workspaceUri,
    uid,
    icons: [],
    state: QuickPickOpenState.Default,
    picks: [],
    recentPicks: [],
    recentPickIds: Object.create(null),
    versionId: 0,
    warned: [],
    maxVisibleItems: 10,
    uri,
    cursorOffset: 0,
    height: 300,
    top: 50,
    width: 600,
    ...VirtualList.create({
      itemHeight: listItemHeight,
      headerHeight: 38,
      minimumSliderSize: MinimumSliderSize.minimumSliderSize,
    }),
    inputSource: InputSource.User,
    args,
    focused: false,
    platform,
    value: '',
    fileIconCache: Object.create(null),
  }
  QuickPickStates.set(uid, state, state)
}
