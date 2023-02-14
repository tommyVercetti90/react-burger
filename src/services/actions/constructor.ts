import { v4 as uuid} from "uuid"
import { TIngredient } from "../types/types";
import { AppThunk } from "../types";
export const ADD_INGREDIENT: 'ADD_INGREDIENT' = 'ADD_INGREDIENT'
export const ADD_BUN: 'ADD_BUN' = 'ADD_BUN'
export const REMOVE_INGREDIENT: 'REMOVE_INGREDIENT' = 'REMOVE_INGREDIENT'
export const SORT_INGREDIENTS: 'SORT_INGREDIENTS' = 'SORT_INGREDIENTS'
export const CLEAR_INGREDIENTS: 'CLEAR_INGREDIENTS' = 'CLEAR_INGREDIENTS'

export interface IAddIngredientAction {
  readonly type: typeof ADD_INGREDIENT;
  readonly payload: TIngredient;
}

export interface IRemoveIngredientAction {
  readonly type: typeof REMOVE_INGREDIENT;
  payload: string;
}

export interface IResetIngredientsAction {
  readonly type: typeof CLEAR_INGREDIENTS;
}

export interface IAddBunAction {
  readonly type: typeof ADD_BUN;
  readonly payload: TIngredient;
}

export interface IMoveIngredientAction {
  readonly type: typeof SORT_INGREDIENTS;
  readonly payload: TIngredient[];
  readonly dragIndex: number;
  readonly hoverIndex: number;
}

export type TConstructor = 
  | IAddIngredientAction
  | IRemoveIngredientAction 
  | IResetIngredientsAction
  | IAddBunAction
  | IMoveIngredientAction;

export const addIngredientToConstructor = (item:TIngredient) => {
  return function(dispatch:AppThunk) {
      dispatch({
          type: ADD_INGREDIENT,
          payload: {...item, ingredientUuid: uuid()}
      })
  }
}

export const addBunToConstructor = (item: TIngredient) => {
  return function(dispatch:AppThunk) {
      dispatch({
          type: ADD_BUN,
          payload: {...item, ingredientUuid: uuid()}
      })
  }
}
 
export const sortIngredients = ( dragIndex: number, hoverIndex: number, constructorIngredients: TIngredient[] ) => {

  return function(dispatch:AppThunk) {

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

export const clearIngredients = () => {
  return {
    type: CLEAR_INGREDIENTS
  }
} 
