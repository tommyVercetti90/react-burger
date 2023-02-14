
import { 
    REGISTER_REQUEST, 
    REGISTER_SUCCESS, 
    REGISTER_FAILED,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILED,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAILED,
    EDIT_USER_REQUEST,
    EDIT_USER_SUCCESS,
    EDIT_USER_FAILED
  } from '../actions/user';
  
  import type { TUserActions } from '../actions/user';
  import type { TUser } from '../types/types';

  type TUserState = {
    user: TUser | null;
    status: string | null;
    registerRequest: boolean;
    registerSuccess: boolean;
    registerFailure: boolean;
    loginRequest: boolean;
    loginFailure: boolean;
    logoutRequest: boolean;
    logoutFailed: boolean;
    getUserRequest: boolean;
    getUserFailure: boolean;
    editUserRequest: boolean;
    editUserSuccess: boolean;
    editUserFailure: boolean;
  };
  
  const initialState: TUserState = {
    user: null,
    status: null,
    registerRequest: false,
    registerSuccess: false,
    registerFailure: false,
    loginRequest: false,
    loginFailure: false,
    logoutRequest: false,
    logoutFailed: false,
    getUserRequest: false,
    getUserFailure: false,
    editUserRequest: false,
    editUserSuccess: false,
    editUserFailure: false,
  };

  export const userReducer = (state = initialState, action: TUserActions) => {
    switch (action.type) {
      case REGISTER_REQUEST: {
        return {
          ...state,
          status: null,
          registerRequest: true,
          registerFailure: false
        }
      }
  
      case REGISTER_SUCCESS: {
        return {
          ...state,
          status: 'Успешная регистрация',
          user: action.user,
          registerRequest: false,
          registerSuccess: true,
          registerFailure: false
        }
      }
  
      case REGISTER_FAILED: {
        return {
          ...state,
          status: action.err,
          registerRequest: false,
          registerSuccess: false,
          registerFailure: true
        }
      }
  
      case LOGIN_REQUEST: {
        return {
            ...state,
            loginRequest: true,
            loginFailure: false
       }
    }
  
    case LOGIN_SUCCESS: {
        return {
            ...state,
            user: action.user,
            loginRequest: false,
            loginFailure: false
       }
    }
  
    case LOGIN_FAILED: {
        return {
            ...state,
            loginRequest: false,
            loginFailure: true,
            status: action.status
       }
    }
  
    case LOGOUT_REQUEST: {
      return {
          ...state,
          user: null,
          logoutRequest: true,
          logoutFailure: false,
      }
    }
  
    case LOGOUT_SUCCESS: {
        return {
            ...state,
            user: null,
            status: action.res.message,
            logoutRequest: false,
            logoutFailure: false,
        }
    }
  
    case LOGOUT_FAILED: {
        return {
            ...state,
            status: action.err,
            logoutRequest: false,
            logoutFailure: true,
        }
    }
  
    case GET_USER_REQUEST: {
      return {
        ...state,
        getUserRequest: true,
        getUserFailure: false
      }
    }
  
    case GET_USER_SUCCESS: {
      return {
        ...state,
        user: action.user,
        getUserRequest: false,
        getUserFailure: false
      }
    }
  
    case GET_USER_FAILED: {
      return {
        ...state,
        status: action.err,
        getUserRequest: false,
        getUserFailure: true
      }
    }
  
    case EDIT_USER_REQUEST: {
      return {
        ...state,
        editUserRequest: true,
        editUserFailure: false,
        editUserSuccess: true,
      }
    }
    
    case EDIT_USER_SUCCESS: {
      return {
        ...state,
        user: action.user,
        editUserRequest: false,
        editUserSuccess: false,
        editUserFailure: false
      }
    }
  
    case EDIT_USER_FAILED: {
      return {
        ...state,
        editUserRequest: false,
        editUserFailure: true
      }
    }
  
    default:
        return state;
    }
  };