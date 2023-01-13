import {
    ADD_BUN,
    ADD_INGREDIENT,
    REMOVE_INGREDIENT,
    SORT_INGREDIENTS,
    CLEAR_INGREDIENTS } from "../actions/constructor"

const initialState = {
    constructorIngredients: [],
    constructorBun: null,
    ingredient: null,
}

export const constructorReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_BUN: {
        return {
          ...state,
          constructorBun: action.payload
        }
      }
      case ADD_INGREDIENT: {
        return {
          ...state,
          constructorIngredients: [...state.constructorIngredients, action.payload]
        }
      }
      case REMOVE_INGREDIENT: {
        return {
            ...state,
            constructorIngredients: state.constructorIngredients.filter(item => item.ingredientUuid !== action.payload)
        }
      }
      case SORT_INGREDIENTS: {
        return {
            ...state,
            constructorIngredients: action.payload
        }
      }   
      case CLEAR_INGREDIENTS: {
        return {
            ...state,
            constructorIngredients: [],
            constructorBun: null,
        }
      }   
      default:
        return state
    }
  }