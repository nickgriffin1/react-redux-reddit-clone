import { combineReducers } from 'redux'
import {
  ADD_POST,
} from '../actions'

function addView(state = {}, action) {
  console.log('action', action)
  switch (action.type) {
    case ADD_POST :
      return {
        ...state,
        posts: [
          ...state.posts,
          {
            id: action.postId,
            title: action.title,
            body: action.body,
            author: action.author,
            category: action.category,
            time: action.time
          }
        ]
      }
    default :
      return state
  }
}

export default combineReducers({
  addView,
})
