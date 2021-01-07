import {
  ACCOUNT_REMOVAL_SUCCESS,
  CREATE_USER_ERROR,
  CREATE_USER_SUCCESS,
  LOGOUT_USER_SUCCESS,
  PASSWORD_RESET_FROM_EMAIL_FAILURE,
  PASSWORD_RESET_FROM_EMAIL_SUCCESS,
  RESETING_PASSWORD,
  RESET_PASSWORD_EMAIL_SENT,
  RESET_PASSWORD_EMAIL_UNSENT,
  SIGNING_ATTEMPT,
  SIGNIN_ERROR,
  SIGNIN_ON_LOAD_SUCCESS,
  SIGNIN_SUCCESS,
  SIGNUP_ATTEMPT,
  SIGNUP_ERROR,
  SIGNUP_SUCCESS,
  UPDATE_PASSWORD_ERROR,
  UPDATE_PASSWORD_SUCCESS,
  UPDATING_PASSWORD,
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
        singinErrorMessages: action.payload,
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
        signupSuccess: true,
      };
    }
    case SIGNUP_ERROR: {
      return {
        signupAttempt: false,
        signupErrorMessages: action.payload,
      };
    }

    case UPDATING_PASSWORD: {
      return {
        ...state,
        hasPasswordUpdateErrors: false,
        passwordErrors: null,
        updatingPassword: true,
        passwordUpdateSuccess: false,
      };
    }

    case UPDATE_PASSWORD_SUCCESS: {
      return {
        ...state,
        passwordErrors: null,
        hasPasswordUpdateErrors: false,
        passwordUpdateSuccess: true,
        updatingPassword: false,
      };
    }
    case UPDATE_PASSWORD_ERROR: {
      return {
        ...state,
        passwordErrors: action.payload,
        hasPasswordUpdateErrors: true,
        updatingPassword: false,
        passwordUpdateSuccess: false,
      };
    }
    case RESETING_PASSWORD: {
      return {
        ...state,
        resetingPassword: true,
        resetPasswordEmailSent: false,
      };
    }
    case RESET_PASSWORD_EMAIL_SENT: {
      return {
        ...state,
        resetPasswordEmailSent: true,
        resetingPassword: false,
        resetPasswordEmailUnsent: false,
        emailSentMessage: action.payload,
      };
    }
    case RESET_PASSWORD_EMAIL_UNSENT: {
      return {
        ...state,
        resetPasswordEmailSent: false,
        resetingPassword: false,
        resetPasswordEmailUnsent: true,
        emailUnsentMessage: action.payload,
      };
    }
    case PASSWORD_RESET_FROM_EMAIL_SUCCESS: {
      return {
        ...state,
        passwordRecovered: true,
        passwordRecoveryFailed: true,
        passwordRecoverMessage: action.payload,
      };
    }
    case PASSWORD_RESET_FROM_EMAIL_FAILURE: {
      return {
        ...state,
        passwordRecovered: false,
        passwordRecoveryFailed: true,
        passwordRecoverFailMessage: action.payload,
      };
    }
    case LOGOUT_USER_SUCCESS: {
      return {
        user: null,
        logoutSuccess: true,
      };
    }
    case ACCOUNT_REMOVAL_SUCCESS: {
      return {
        user: null,
        accountRemovalSuccess: true,
      };
    }

    default:
      return state;
  }
};

export default usersReducer;
