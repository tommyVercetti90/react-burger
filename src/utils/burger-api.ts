import { getCookie, setCookie } from "./cookie"; 
import { BASE_URL } from "../services/constants";

export const checkResponse = (res: Response) => {
  if (res.ok) {
      return res.json();
  }
  return res.json().then((error: { success: boolean; message: string; }) => Promise.reject(error));
}

export const apiRequest = (url: string, options?: {}) => {
  return fetch(`${BASE_URL}/${url}`, options)
  .then(checkResponse)
  .then(data => {
    if (data.success) {
      return data
    }
    return Promise.reject(data.message)
  })
};


export const refreshToken = async ()  => {
  const options = {
    method: 'POST',
    body: JSON.stringify({
      "token": getCookie('refreshToken')
  }),
    headers: {
      'Content-Type': 'application/json'
    }
  }

  await apiRequest('auth/token', options)
    .then(res => {
      setCookie('accessToken', res.accessToken);
      setCookie('refreshToken', res.refreshToken);
    })
};