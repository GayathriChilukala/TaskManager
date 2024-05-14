import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import userReducer from '../reducers/userReducer';
import { composeWithDevTools } from 'redux-devtools-extension'; // Import composeWithDevTools
const rootReducer = combineReducers({
  email: userReducer,

});

const enhancer = composeWithDevTools(
  applyMiddleware(thunk)
);

const store = createStore(rootReducer, enhancer);

export default store;
