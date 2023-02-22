
import type { TOrder } from '../types/types';
import type { TOrderActions } from '../actions/order'; 

import {
    FETCH_ORDER_SUCCESS,
    FETCH_ORDER_REQUEST,
    FETCH_ORDER_ERROR,
    CLOSE_ORDER} from "../actions/order"

type TOrderState = {
  orderDetails: number;
  fetchRequestOrder: boolean;
  fetchErrorOrder: boolean;
}

export const initialState: TOrderState = {
  orderDetails: 0,
  fetchRequestOrder: false,
  fetchErrorOrder: false
}

export const orderReducer = (state = initialState, action: TOrderActions):TOrderState => {
    switch (action.type) {
      case FETCH_ORDER_REQUEST:
        return {
            ...state,
            fetchRequestOrder: true,
            fetchErrorOrder: false
        }           
      case FETCH_ORDER_ERROR:
        return {
            ...state,
            fetchRequestOrder: false,
            fetchErrorOrder: action.payload
        }      
      case FETCH_ORDER_SUCCESS: 
          return {
              ...state,
              orderDetails: action.payload,
              fetchRequestOrder: false
      }
      case CLOSE_ORDER: 
        return {
          ...state,
          orderDetails: 0,
      } 
      default:
        return state
    }
  }