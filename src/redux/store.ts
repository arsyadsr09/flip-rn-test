import {
  legacy_createStore as createStore,
  applyMiddleware,
  combineReducers,
} from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers';

const rootReducer = combineReducers({reducers});

export const store = createStore(rootReducer, applyMiddleware(thunk));
