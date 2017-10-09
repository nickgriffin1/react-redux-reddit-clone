import { combineReducers } from 'redux'

import {
  ADD_POST,
} from '../actions'

function mainView(state = {}, action) {
  switch (action.type) {
    case 'ADD_POST' :
      return {
        ...state,
        action
      }
    default :
      return state
  }
}

export default combineReducers({
  mainView
})
