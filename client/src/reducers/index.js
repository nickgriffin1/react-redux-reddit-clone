import { combineReducers } from 'redux'

import {
  GET_POSTS,
} from '../actions'

function mainView(state = {}, action) {
  switch (action.type) {
    case GET_POSTS :
      return {
        ...state,
      }
    default :
      return state
  }
}

export default combineReducers({
  mainView
})
