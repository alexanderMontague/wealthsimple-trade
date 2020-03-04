import { TOGGLE_SIDEBAR } from '../constants'

import sidebarRoutes from '../../routes/sidebar'

const initialState = {
    sidebarRoutes,
    sidebarVisible: false,
}

const interfaceReducer = (prevState = initialState, action) => {
    switch (action.type) {
        case TOGGLE_SIDEBAR:
            return { ...prevState, sidebarVisible: !prevState.sidebarVisible }
        default:
            return prevState
    }
}

export default interfaceReducer
