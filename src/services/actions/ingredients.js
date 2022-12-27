import { BASE_URL } from "../constants"
import { request } from "../../utils/check-response"
export const INGREDIENT_DETAILS = 'INGREDIENT_DETAILS'
export const CLOSE_MODAL = 'CLOSE_MODAL'
export const FETCH_INGREDIENTS_REQUEST = 'FETCH_INGREDIENTS_REQUEST'
export const FETCH_INGREDIENTS_SUCCESS = 'FETCH_INGREDIENTS_SUCCESS'
export const FETCH_INGREDIENTS_ERROR = 'FETCH_INGREDIENTS_ERROR'

const _API_INGREDIENTS = BASE_URL+'ingredients'

export const fetchIngredients = () => (dispatch) => {
    dispatch({type:FETCH_INGREDIENTS_REQUEST})
    request(_API_INGREDIENTS).then((response)=> {
       dispatch({
         type: FETCH_INGREDIENTS_SUCCESS,
         payload: response
       })
     })
     .catch((error) => {
        dispatch({
          type: FETCH_INGREDIENTS_ERROR, 
          payload: error
        })
     })
   }

export const getIngredient = (ingredient) => (dispatch) => {
    dispatch({type:FETCH_INGREDIENTS_REQUEST})
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

