import { 
    FETCH_INGREDIENTS_REQUEST, 
    FETCH_INGREDIENTS_SUCCESS, 
    FETCH_INGREDIENTS_ERROR,
    INGREDIENT_DETAILS,
    CLOSE_MODAL } from "../actions/ingredients"

const initialState = {
  ingredients: [],
  ingredient: null,
  fetchRequestIngredients: false,
  fetchErrorIngredients: null 
} 


export const ingredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_INGREDIENTS_REQUEST:
            return {
                ...state,
                fetchRequestIngredients: true,
                fetchErrorIngredients: null
            }
            case FETCH_INGREDIENTS_SUCCESS: 
            return {
                ...state, 
                ingredients: action.payload.data,
                fetchRequestIngredients: false
            }
            case FETCH_INGREDIENTS_ERROR: 
            return {
                ...state,
                fetchRequestIngredients: false,
                fetchErrorIngredients: action.payload
            }
            case INGREDIENT_DETAILS: 
            return {
                ...state,
                ingredient: action.payload,
                fetchRequestIngredients: false
            }
            case CLOSE_MODAL: 
            return {
                ...state,
                ingredient: null,
                fetchRequestIngredients: false,
                fetchErrorIngredients: null
            }
      default:
        return state
    }
  }