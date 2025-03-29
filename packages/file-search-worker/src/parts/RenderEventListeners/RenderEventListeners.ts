import type { DomEventListener } from '../DomEventListener/DomEventListener.ts'
import * as DomEventListenersFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'

export const renderEventListeners = (): readonly DomEventListener[] => {
  return [
    {
      name: DomEventListenersFunctions.HandleClickOk,
      params: ['handleClickOk'],
    },
    {
      name: DomEventListenersFunctions.HandleClickClose,
      params: ['handleClickClose'],
    },
    {
      name: DomEventListenersFunctions.HandleClickCopy,
      params: ['handleClickCopy'],
    },
    {
      name: DomEventListenersFunctions.HandleFocusIn,
      params: ['handleFocusIn'],
    },
    {
      name: DomEventListenersFunctions.HandleContextMenu,
      params: [],
      preventDefault: true,
    },
  ]
}
