import { 
    FETCH_INGREDIENTS_REQUEST, 
    FETCH_INGREDIENTS_SUCCESS, 
    FETCH_INGREDIENTS_ERROR,
    INGREDIENT_DETAILS,
    CLOSE_MODAL } from "../actions/ingredients"
    
import type { TIngredientsActions } from '../actions/ingredients';
import type { TIngredient } from '../types/types';

type TIngredientsState = {
    ingredients: TIngredient[];
    ingredient: TIngredient | null;
    fetchRequestIngredients: boolean;
    fetchErrorIngredients: boolean;
    }

const initialState: TIngredientsState = {
  ingredients: [],
  ingredient: null,
  fetchRequestIngredients: false,
  fetchErrorIngredients: false 
} 


export const ingredientsReducer = (state = initialState, action: TIngredientsActions):TIngredientsState => {
    switch (action.type) {
        case FETCH_INGREDIENTS_REQUEST:{
            return {
                ...state,
                fetchRequestIngredients: true,
                fetchErrorIngredients: false
            }}

            case FETCH_INGREDIENTS_SUCCESS:{ 
                return {
                    ...state, 
                    ingredients: action.payload,
                    fetchRequestIngredients: false
                }}

            case FETCH_INGREDIENTS_ERROR: {
                return {
                    ...state,
                    fetchRequestIngredients: false,
                    fetchErrorIngredients: true
                }}

            case INGREDIENT_DETAILS:{ 
                return {
                    ...state,
                    ingredient: action.payload,
                    fetchRequestIngredients: false
                }}
            
            case CLOSE_MODAL:{ 
                return {
                    ...state,
                    ingredient: null,
                    fetchRequestIngredients: false,
                    fetchErrorIngredients: false
                }}
      default:
        return state
    }
  }