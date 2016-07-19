
import { ActionCreators } from 'redux-undo';

export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR';
export const POPULATE_SEARCH = 'POPULATE_SEARCH';

export function toggleSidebar(value) {
  return {
    type: TOGGLE_SIDEBAR,
    value : value
  };
}

export function undo() {
  return (dispatch, getState) => {
    dispatch(ActionCreators.undo());
  };
}

export function redo() {
  return (dispatch, getState) => {
    dispatch(ActionCreators.redo());
  };
}

export function populateSearch(type, docIds) {
  var search_docs = docs.map(function(docId) { return { type: type, docId: docId }});
  return {
    type: POPULATE_SEARCH,
    docs: search_docs
  }
}


/**
* Bundle User into layout
*/

import { GET_USER, getUser} from './user';
export { getUser as getUser };
export { GET_USER as GET_USER };
