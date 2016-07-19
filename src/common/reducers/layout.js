import { TOGGLE_SIDEBAR, POPULATE_SEARCH } from '../actions/layout';

export default function layout(state = {sidebarOpen: false, search_docs: []}, action) {
  switch (action.type) {
  case TOGGLE_SIDEBAR:
    return Object.assign({}, state, {
    	sidebarOpen : action.value
    });
  case POPULATE_SEARCH:
    return Object.assign({}, state, {
      search_docs: action.docs
    });
  default:
    return state;
  }
}
