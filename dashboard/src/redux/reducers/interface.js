import { TOGGLE_SIDEBAR, SELECT_SIDEBAR_ITEM } from '../constants'

import sidebarRoutes from '../../routes/sidebar'

const initialState = {
  sidebarRoutes,
  sidebarVisible: false,
  selectedNavItem: ''
};

const interfaceReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return { ...prevState, sidebarVisible: !prevState.sidebarVisible };
    case SELECT_SIDEBAR_ITEM:
      return {...prevState, }
    default:
      return prevState;
  }
};

export default interfaceReducer;
