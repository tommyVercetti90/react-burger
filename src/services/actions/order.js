import { BASE_URL } from "../constants"
import { request } from "../../utils/check-response"
export const FETCH_ORDER_REQUEST = 'FETCH_ORDER_REQUEST'
export const FETCH_ORDER_SUCCESS = 'FETCH_ORDER_SUCCESS'
export const FETCH_ORDER_ERROR = 'FETCH_ORDER_ERROR'
export const CLOSE_ORDER = 'CLOSE_ORDER'

const _API_ORDERS = BASE_URL+'orders'

export const getOrderDetails = (ingredientsId) => (dispatch) => {
    dispatch({type:FETCH_ORDER_REQUEST})
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({"ingredients": ingredientsId})
    }  
    request(_API_ORDERS,requestOptions).then((response)=> {
        dispatch({
          type: FETCH_ORDER_SUCCESS,
          payload: response
        })
      })
      .catch((error) => {
         dispatch({
           type: FETCH_ORDER_ERROR,
           payload: error
         })
      })
    }

export const clearOrderNum = () => {
    return {
        type: CLOSE_ORDER
    }
} 