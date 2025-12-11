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
    cursorOffset: 0,
    height: 300,
    icons: [],
    maxVisibleItems: 10,
    picks: [],
    recentPickIds: Object.create(null),
    recentPicks: [],
    state: QuickPickOpenState.Default,
    top: 50,
    uid,
    uri,
    versionId: 0,
    warned: [],
    width: 600,
    workspaceUri,
    ...VirtualList.create({
      headerHeight: 38,
      itemHeight: listItemHeight,
      minimumSliderSize: MinimumSliderSize.minimumSliderSize,
    }),
    args,
    fileIconCache: Object.create(null),
    focused: false,
    inputSource: InputSource.User,
    platform,
    value: '',
  }
  QuickPickStates.set(uid, state, state)
}
