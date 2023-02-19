import type { TResetPasswordActions } from '../actions/reset-password';

import {
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILED,
    FORGOT_PASSWORD_REQUEST, 
    FORGOT_PASSWORD_SUCCESS, 
    FORGOT_PASSWORD_FAILED
  } from '../actions/reset-password';
  
  type TResetPasswortState = {
    status: string | null;
    forgotRequest: boolean;
    fargotSuccess: boolean;
    forgotFailed: boolean;
    resetRequest: boolean;
    resetSuccess: boolean;
    resetFailure: boolean;}
  
  const initialState: TResetPasswortState = {
    status: null,
    forgotRequest: false,
    fargotSuccess: false,
    forgotFailed: false,
    resetRequest: false,
    resetSuccess: false,
    resetFailure: false
  }

  export const resetPasswordReducer = (state = initialState, action: TResetPasswordActions) => {
    switch (action.type) {
      case FORGOT_PASSWORD_REQUEST: {
        return {
          ...state,
          status: 'Идет отправка данных',
          forgotRequest: true,
          fargotSuccess: false,
          forgotFailed: false
        }
      }
  
      case FORGOT_PASSWORD_SUCCESS: {
        return {
          ...state,
          status: action.status.message,
          forgotRequest: false,
          fargotSuccess: true,
          forgotFailed: false
        }
      }
  
      case FORGOT_PASSWORD_FAILED: {
        return {
          ...state,
          status: action.err,
          forgotRequest: false,
          fargotSuccess: false,
          forgotFailed: true
        }
      }
      
      case RESET_PASSWORD_REQUEST: {
        return {
          ...state,
          status: 'Идет отправка данных',
          resetRequest: true,
          resetFailure: false
        }
      }
  
      case RESET_PASSWORD_SUCCESS: {
        return {
          ...state,
          status: action.status.message,
          resetSuccess: true,
          resetRequest: false,
          resetFailure: false
        }
      }
  
      case RESET_PASSWORD_FAILED: {
        return {
          ...state,
          status: action.err,
          resetRequest: false,
          resetSuccess: false,
          resetFailure: true
        }
      }
      default:
        return state;
    }
  }