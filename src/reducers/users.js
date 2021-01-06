import {
  CREATE_USER_ERROR,
  CREATE_USER_SUCCESS,
  LOGOUT_USER_SUCCESS,
  SIGNING_ATTEMPT,
  SIGNIN_ERROR,
  SIGNIN_ON_LOAD_SUCCESS,
  SIGNIN_SUCCESS,
  SIGNUP_ATTEMPT,
  SIGNUP_ERROR,
  SIGNUP_SUCCESS,
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
        signinSuccess: true,
      };
    }
    case SIGNIN_ON_LOAD_SUCCESS: {
      return { ...state, user: action.payload };
    }
    case SIGNIN_ERROR: {
      return {
        ...state,
        signinAttempt: false,
        singinErrorMessage: 'Invalid credentials',
      };
    }
    case SIGNUP_ATTEMPT: {
      return {
        ...state,
        signupAttempt: true,
      };
    }
    case SIGNUP_SUCCESS: {
      return {
        ...state,
        signupAttempt: false,
        user: action.payload,
        signupSuccess: true,
      };
    }
    case SIGNUP_ERROR: {
      return {
        signupAttempt: false,
        signupErrorMessages: action.payload,
      };
    }
    case LOGOUT_USER_SUCCESS: {
      return {
        user: null,
        logoutSuccess: true,
      };
    }

    default:
      return state;
  }
};

export default usersReducer;
