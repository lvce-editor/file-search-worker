import type { DomEventListener } from '../DomEventListener/DomEventListener.ts'
import * as DomEventListenersFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'

export const renderEventListeners = (): readonly DomEventListener[] => {
  return [
    {
      name: DomEventListenersFunctions.HandlePointerDown,
      params: ['handlePointerDown', 'event.clientX', 'event.clientY'],
      preventDefault: true,
    },
    {
      name: DomEventListenersFunctions.HandleWheel,
      params: ['handleWheel'],
    },
    {
      name: DomEventListenersFunctions.HandleBlur,
      params: ['handleBlur'],
    },
    {
      name: DomEventListenersFunctions.HandleBeforeInput,
      params: ['handleBeforeInput'],
    },
  ]
}
