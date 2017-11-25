import { RECEIVE_CATEGORIES } from '../actions'

var initialCategoriesState = []
export function categories(state = initialCategoriesState, action) {
  // TODO create functionality for creating categories
  switch(action.type) {
    case RECEIVE_CATEGORIES:
      return [
        ...action.categories
      ]
    default:
      return state
  }
}
