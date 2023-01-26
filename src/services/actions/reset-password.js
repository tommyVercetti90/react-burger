import { apiRequest } from '../../utils/burger-api';

export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILED = 'FORGOT_PASSWORD_FAILED';

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';


export const getForgotPassword = (email, history) => (dispatch) => {
  const options = {
    method: 'POST',
    body: JSON.stringify({ 'email': email }),
    headers: {
      'Content-Type': 'application/json'
    }
  }

  dispatch({
    type: FORGOT_PASSWORD_REQUEST
  })
  
  apiRequest('password-reset', options)
    .then(status => dispatch({
      type: FORGOT_PASSWORD_SUCCESS,
      status
    }))
    .then(() => history.push({pathname: '/reset-password'}))
    .catch((err) => dispatch({
      type: FORGOT_PASSWORD_FAILED,
      err
    }))
};

export const postResetPassword = (password, emailCode, history) => (dispatch) => {
  const options = {
    method: 'POST',
    body: JSON.stringify(  {
      "password": password,
      "token": emailCode
  }),
    headers: {
      'Content-Type': 'application/json'
    }
  }

  dispatch({
    type: RESET_PASSWORD_REQUEST
  })

  apiRequest('password-reset/reset', options)
    .then(status => dispatch({
      type: RESET_PASSWORD_SUCCESS,
      status
    }))
    .then(() => history.push({pathname: '/login'}))
    .catch(err => dispatch({
      type: RESET_PASSWORD_FAILED,
      err
    }))

};