// Actions relating to UI elements
import { TOGGLE_SIDEBAR, SELECT_SIDEBAR_ITEM } from '../constants'

export const toggleSidebar = () => ({
  type: TOGGLE_SIDEBAR
});

export const selectSidebarItem = payload => ({
  type: SELECT_SIDEBAR_ITEM,
  payload
});
