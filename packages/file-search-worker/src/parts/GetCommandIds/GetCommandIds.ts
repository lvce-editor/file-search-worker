const commandIds = [
  'handleBlur',
  'handleClickAt',
  'handleWheel',
  'selectCurrentIndex',
  'selectIndex',
  'selectItem',
  'focusFirst',
  'focusIndex',
  'focusLast',
  'focusNext',
  'focusPrevious',
  'setValue',
  'handleInput',
  'handleBeforeInput',
]

export const getCommandIds = (): readonly string[] => {
  return commandIds
}
