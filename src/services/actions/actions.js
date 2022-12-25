import { BASE_URL } from "../../constants/constants"
import { request } from "../../utils/check-response"
import { v4 as uuid} from "uuid"

const _API_INGREDIENTS = BASE_URL+'ingredients'
const _API_ORDERS = BASE_URL+'orders'

export const FETCH_REQUEST = 'FETCH_REQUEST'
export const FETCH_SUCCESS = 'FETCH_SUCCESS'
export const FETCH_ERROR = 'FETCH_ERROR'
export const INGREDIENT_DETAILS = 'INGREDIENT_DETAILS'
export const ORDER_DETAILS = 'ORDER_DETAILS'
export const CLOSE_MODAL = 'CLOSE_MODAL'
export const CLOSE_ORDER = 'CLOSE_CLOSE_ORDER'
export const ADD_INGREDIENT = 'ADD_INGREDIENT'
export const ADD_BUN = 'ADD_BUN'
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT'
export const SORT_INGREDIENTS = 'SORT_INGREDIENTS'

export const fetchIngredients = () => (dispatch) => {
  dispatch({type:FETCH_REQUEST})
  request(_API_INGREDIENTS).then((response)=> {
     dispatch({
       type: FETCH_SUCCESS,
       payload: response
     })
   })
   .catch((error) => {
      dispatch({
        type: FETCH_ERROR, 
        payload: error
      })
   })
 }

export const getIngredient = (ingredient) => (dispatch) => {
    dispatch({type:FETCH_REQUEST})
    dispatch({
      type: INGREDIENT_DETAILS,
      payload: ingredient
    })
  }

export const clearDataModal = () => {
    return {
      type: CLOSE_MODAL
    }
}

export const clearDataOrder = () => {
    return {
      type: CLOSE_ORDER
    }
}

export const addIngredientToConstructor = (item) => {
  return function(dispatch) {
      dispatch({
          type: ADD_INGREDIENT,
          payload: {...item, ingredientUuid: uuid()}
      })
  }
}

export const addBunToConstructor = (item) => {
  return function(dispatch) {
      dispatch({
          type: ADD_BUN,
          payload: {...item, ingredientUuid: uuid()}
      })
  }
}

export const sortIngredients = ( dragIndex, hoverIndex, constructorIngredients ) => {

  return function(dispatch) {

      const dragItem = constructorIngredients[dragIndex]
      const newSortIngredients = [...constructorIngredients]
      const prevItem = newSortIngredients.splice(hoverIndex, 1, dragItem)
      newSortIngredients.splice(dragIndex, 1, prevItem[0])
      
      dispatch({
          type: SORT_INGREDIENTS,
          payload: newSortIngredients
      })
  }
}

export const getOrderDetails = (ingredientsId) => (dispatch) => {
  dispatch({type:FETCH_REQUEST})
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({"ingredients": ingredientsId})
  }  
  request(_API_ORDERS,requestOptions).then((response)=> {
      dispatch({
        type: ORDER_DETAILS,
        payload: response
      })
    })
    .catch((error) => {
       dispatch({
         type: FETCH_ERROR,
         payload: error
       })
    })
  }