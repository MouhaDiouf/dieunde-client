import {
  CREATE_USER_ERROR,
  CREATE_USER_SUCCESS,
  SIGNING_ATTEMPT,
  SIGNIN_ERROR,
  SIGNIN_SUCCESS,
} from '../actions/actions';

const usersReducer = (state = { user: null }, action) => {
  switch (action.type) {
    case CREATE_USER_SUCCESS:
      return action.payload;
    case CREATE_USER_ERROR:
      return { signupError: action.payload };
    case SIGNING_ATTEMPT:
      return {
        signinAttempt: true,
        singinErrorMessage: null,
      };
    case SIGNIN_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        signinAttempt: false,
      };
    }
    case SIGNIN_ERROR: {
      return {
        ...state,
        signinAttempt: false,
        singinErrorMessage: 'Invalid credentials',
      };
    }
    default:
      return state;
  }
};

export default usersReducer;
