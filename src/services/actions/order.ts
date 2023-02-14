import { apiRequest } from "../../utils/burger-api"
import { TIngredient } from '../types/types';
import { AppThunk } from "../types";
export const FETCH_ORDER_REQUEST: 'FETCH_ORDER_REQUEST' = 'FETCH_ORDER_REQUEST'
export const FETCH_ORDER_SUCCESS: 'FETCH_ORDER_SUCCESS' = 'FETCH_ORDER_SUCCESS'
export const FETCH_ORDER_ERROR: 'FETCH_ORDER_ERROR' = 'FETCH_ORDER_ERROR'
export const CLOSE_ORDER: 'CLOSE_ORDER' = 'CLOSE_ORDER'

export interface IPostOrderRequestAction {
  readonly type: typeof FETCH_ORDER_REQUEST
}

export interface IPostOrderSuccessAction {
  readonly type: typeof FETCH_ORDER_SUCCESS
  payload: number
}

export interface IPostOrderFailedAction {
  readonly type: typeof FETCH_ORDER_ERROR
  payload: boolean
}

export interface ICloseOrder {
  readonly type: typeof CLOSE_ORDER
}

export type TOrderActions =
  | IPostOrderRequestAction
  | IPostOrderSuccessAction
  | IPostOrderFailedAction
  | ICloseOrder

export const getOrderDetails = (ingredientsId:string[]) => (dispatch: AppThunk) => {
    dispatch({type:FETCH_ORDER_REQUEST})
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({"ingredients": ingredientsId})
    }  
    apiRequest('orders',requestOptions).then((response)=> {
        dispatch({
          type: FETCH_ORDER_SUCCESS,
          payload: response.order.number
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