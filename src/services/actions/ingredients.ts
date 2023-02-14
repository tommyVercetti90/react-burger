import { apiRequest } from "../../utils/burger-api"
import type { TIngredient } from "../types/types";
import { AppDispatch, AppThunk } from '../types/index';

export const INGREDIENT_DETAILS: 'INGREDIENT_DETAILS' = 'INGREDIENT_DETAILS'
export const CLOSE_MODAL: 'CLOSE_MODAL' = 'CLOSE_MODAL'
export const FETCH_INGREDIENTS_REQUEST: 'FETCH_INGREDIENTS_REQUEST' = 'FETCH_INGREDIENTS_REQUEST'
export const FETCH_INGREDIENTS_SUCCESS: 'FETCH_INGREDIENTS_SUCCESS' = 'FETCH_INGREDIENTS_SUCCESS'
export const FETCH_INGREDIENTS_ERROR: 'FETCH_INGREDIENTS_ERROR' = 'FETCH_INGREDIENTS_ERROR'

export interface IGetICloseModal {
  readonly type: typeof CLOSE_MODAL;
  payload: TIngredient;
}

export interface IGetIngredientDetails {
  readonly type: typeof INGREDIENT_DETAILS;
  payload: TIngredient;
}

export interface IGetIngredientsRequestAction {
  readonly type: typeof FETCH_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsSuccessAction {
  readonly type: typeof FETCH_INGREDIENTS_SUCCESS;
  payload: TIngredient[];
}

export interface IGetIngredientsSuccessFailed {
  readonly type: typeof FETCH_INGREDIENTS_ERROR;
  readonly payload: string
}

export type TIngredientsActions = 
    | IGetIngredientsRequestAction
    | IGetIngredientsSuccessAction
    | IGetIngredientsSuccessFailed
    | IGetIngredientDetails
    | IGetICloseModal


export const fetchIngredients: AppThunk = () => (dispatch: AppDispatch) => {
    dispatch({type:FETCH_INGREDIENTS_REQUEST})
    apiRequest('ingredients').then((response)=> {
       dispatch({
         type: FETCH_INGREDIENTS_SUCCESS,
         payload: response.data
       })
     })
     .catch((error) => {
        dispatch({
          type: FETCH_INGREDIENTS_ERROR, 
          payload: error
        })
     })
   }

export const getIngredient = (ingredient: TIngredient) => (dispatch: AppDispatch) => {
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

