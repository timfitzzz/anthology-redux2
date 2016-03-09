import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';
import undoable from 'redux-undo';

import user from './user';
import counter from './counter';
import layout from './layout';
import todos from './todos';
import version from './version';
import { selectedReddit, postsByReddit } from './reddit';
import scenes from './scenes';

const rootReducer = combineReducers({
  user : user,
  users: users,
  version : version,
  counter : undoable(counter),
  layout : undoable(layout),
  todos : undoable(todos),
  selectedReddit : undoable(selectedReddit),
  postsByReddit : undoable(postsByReddit),
  router : routerStateReducer,
  scenes: undoable(scenes)
});

export default rootReducer;
