import { SET_CURRENT_INGREDIENT, RESET_CURRENT_INGREDIENT } from '../actions/current-ingredient';
import type { TCurrentIngredientActions } from '../actions/current-ingredient';
import type { TIngredient } from '../types/types';

type TCurrentIngredientState = {
  currentIngredient: Partial<TIngredient> | undefined;
}

export const initialState: TCurrentIngredientState = {
  currentIngredient: {}
}


export const currentIngredientReducer = (state = initialState, action: TCurrentIngredientActions): TCurrentIngredientState => {
  switch (action.type) {
    case SET_CURRENT_INGREDIENT: {
      return {
        currentIngredient: action.currentIngredient
      }
    }

    case RESET_CURRENT_INGREDIENT: {
      return {
        currentIngredient: {}
      }
    }
  
    default:
      return state;
  }

};