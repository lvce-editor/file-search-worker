import type { List } from '@lvce-editor/list'
import type { VisibleItem } from '../VisibleItem/VisibleItem.ts'

export interface QuickPickState extends List<VisibleItem> {
  readonly uid: number
  readonly state: number
  readonly recentPicks: readonly any[]
  readonly recentPickIds: Map<any, any>
  readonly versionId: number
  readonly provider: any
  readonly warned: any[]
  readonly maxVisibleItems: number
  readonly uri: string
  readonly cursorOffset: number
  readonly height: number
  readonly top: number
  readonly width: number
  readonly headerHeight: number
  readonly itemHeight: number
  readonly items: readonly VisibleItem[]
  readonly minimumSliderSize: number
  readonly focusedIndex: number
  readonly touchOffsetY: number
  readonly touchTimeStamp: number
  readonly touchDifference: number
  readonly scrollBarHeight: number
  readonly scrollBarActive: boolean
  readonly platform: number
  readonly inputSource: number
  readonly args: readonly any[]
  readonly focused: boolean
  readonly value: string
}
