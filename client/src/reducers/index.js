import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import postReducer from './postReducer';
import testReducer from './testReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  post: postReducer,
  test: testReducer,
});
