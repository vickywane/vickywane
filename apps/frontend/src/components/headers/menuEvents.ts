/*
  The header's mobile menu pushes the page down, and with it the nails the
  hanging banner hangs from. The header announces each open/close on window so
  the banner can react (it jolts) without the two sharing state.
*/

export const MENU_TOGGLE_EVENT = "header:menu-toggle"

export type MenuToggleDetail = { open: boolean }

export const announceMenuToggle = (open: boolean) => {
  window.dispatchEvent(
    new CustomEvent<MenuToggleDetail>(MENU_TOGGLE_EVENT, { detail: { open } })
  )
}

export const onMenuToggle = (listener: (open: boolean) => void) => {
  const handler = (event: Event) =>
    listener((event as CustomEvent<MenuToggleDetail>).detail.open)

  window.addEventListener(MENU_TOGGLE_EVENT, handler)
  return () => window.removeEventListener(MENU_TOGGLE_EVENT, handler)
}
