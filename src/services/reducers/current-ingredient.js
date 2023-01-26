import { SET_CURRENT_INGREDIENT, RESET_CURRENT_INGREDIENT } from '../actions/current-ingredient';

const initialState = {
  currentIngredient: {}
}

export const currentIngredientReducer = (state = initialState, action) => {
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