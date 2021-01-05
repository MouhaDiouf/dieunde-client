import { combineReducers } from 'redux';
import products from './products';
import userReducer from './users';
export default combineReducers({
  products,
  userReducer,
});
