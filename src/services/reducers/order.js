import {
    FETCH_ORDER_SUCCESS,
    FETCH_ORDER_REQUEST,
    FETCH_ORDER_ERROR,
    CLOSE_ORDER} from "../actions/order"

const initialState = {
    orderDetails: 0,
    fetchRequestOrder: false,
    fetchErrorOrder: null
}

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_ORDER_REQUEST:
        return {
            ...state,
            fetchRequestOrder: true,
            fetchErrorOrder: null
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
              orderDetails: action.payload.order.number,
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