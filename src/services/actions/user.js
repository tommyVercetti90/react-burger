import { apiRequest, refreshToken } from "../../utils/burger-api"; 
import { setCookie, deleteCookie, getCookie } from "../../utils/cookie";

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';
export const LOGOUT_DEL_STATUS = 'LOGOUT_DEL_STATUS';

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILED = 'GET_USER_FAILED';

export const EDIT_USER_REQUEST = 'EDIT_USER_REQUEST';
export const EDIT_USER_SUCCESS = 'EDIT_USER_SUCCESS';
export const EDIT_USER_FAILED = 'EDIT_USER_FAILED';


export const registerUser = (name, email, password) => (dispatch) => {
  const options = {
    method: 'POST',
    body: JSON.stringify({
      "email": email, 
      "password": password, 
      "name": name 
  } ),
    headers: {
      'Content-Type': 'application/json'
    }
  }

  dispatch({
    type: REGISTER_REQUEST
  });

  apiRequest('auth/register', options)
    .then((res) => {
      dispatch({
        type: REGISTER_SUCCESS,
        user: res.user
      })
      setCookie('accessToken', res.accessToken);
      setCookie('refreshToken', res.refreshToken);
    })
    .catch(err => {
      if (typeof(err) !== 'object' ) {
        dispatch({
          type: REGISTER_FAILED,
          err
        }) 
      } else {
        dispatch({
          type: REGISTER_FAILED,
          err: 'Ошибка регистрации. Попробуйте заново'
        }) 
      }

    })
};

export const login = (email, password) => (dispatch) => {
  const options = {
      method: 'POST',
      body: JSON.stringify({
          "email": email, 
          "password": password 
      } ),
      headers: {
        'Content-Type': 'application/json'
      }
    }

  dispatch({type: LOGIN_REQUEST});

  apiRequest('auth/login', options)
    .then(res => {
      dispatch({type: LOGIN_SUCCESS, user: res.user});
      setCookie('accessToken', res.accessToken);
      setCookie('refreshToken', res.refreshToken);
    })
    .catch(status => {
      dispatch({ 
          type: LOGIN_FAILED,
          status
      });
    })
};

export const logout = () => (dispatch) => {
  const options = {
      method: 'POST',
      body: JSON.stringify({
          "token": getCookie('refreshToken')
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }

  dispatch({type: LOGOUT_REQUEST});

  apiRequest('auth/logout', options)
    .then((res) => {
      dispatch({type: LOGOUT_SUCCESS, res});
      deleteCookie('accessToken');
      deleteCookie('refreshToken');
    })
    .catch(err => {
      dispatch({
          type: LOGOUT_FAILED,
          err
      });
    })
}

export const getUserInfo = () => (dispatch) => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'authorization': getCookie('accessToken')
    },
  }

  dispatch({
    type: GET_USER_REQUEST
  })

  apiRequest('auth/user', options)
    .then((res) => {
      dispatch({
        type: GET_USER_SUCCESS,
        user: res.user
      })
    })
    .catch(err => {
      if (err === 'jwt expired') {
        refreshToken()
        .then(() => dispatch(getUserInfo()))
      } else {
        dispatch({type: GET_USER_FAILED})
      }
    })

};

export const updateUserInfo = (form) => (dispatch) => {
  const options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'authorization': getCookie('accessToken')
    },
    body: JSON.stringify(form)
  }

  dispatch({type: EDIT_USER_REQUEST});

  apiRequest('auth/user', options)
    .then(({user}) => {
      dispatch({type: EDIT_USER_SUCCESS, user})
    })
    .catch(err => {
      if (err === 'jwt expired') {
        refreshToken()
        .then(() => dispatch(updateUserInfo()))
      } else {
        dispatch({type: EDIT_USER_FAILED, err}) 
      }
    })
};