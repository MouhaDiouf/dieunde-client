import { CREATE_USER_ERROR, CREATE_USER_SUCCESS } from '../actions/actions';

const usersReducer = (state = null, action) => {
  switch (action.type) {
    case CREATE_USER_SUCCESS:
      return action.payload;
    case CREATE_USER_ERROR:
      return { signupError: action.payload };
    default:
      return state;
  }
};

export default usersReducer;
