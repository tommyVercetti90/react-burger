import { 
  FETCH_ERROR, 
  FETCH_SUCCESS, 
  FETCH_REQUEST,
  INGREDIENT_DETAILS,
  ORDER_DETAILS, 
  CLOSE_MODAL,
  ADD_BUN,
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  SORT_INGREDIENTS,
  CLOSE_ORDER } from "../actions/actions"

const initialState = {
  ingredients: [],
  constructorIngredients: [],
  constructorBun: null,
  ingredient: {},
  orderDetails: 0,
  fetchRequest: false,
  fetchError: null 
} 

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REQUEST:
      return {
        ...state,
        fetchRequest: true,
        fetchError: null
      }
    case FETCH_SUCCESS: 
      return {
        ...state, 
        ingredients: action.payload.data,
        fetchRequest: false
      }
    case FETCH_ERROR: 
      return {
        ...state,
        fetchRequest: false,
        fetchError: action.payload
      }
    case INGREDIENT_DETAILS: 
      return {
        ...state,
        ingredient: action.payload,
        fetchRequest: false
      }
    case ORDER_DETAILS: 
      return {
        ...state,
        orderDetails: action.payload.order.number,
        fetchRequest: false
      }
    case CLOSE_MODAL: 
      return {
        ...state,
        ingredient: {},
        orderDetails: 0,
        fetchRequest: false,
        fetchError: null
      }
    case CLOSE_ORDER: 
      return {
        ...state,
        ingredient: {},
        constructorIngredients: [],
        constructorBun: null,
        orderDetails: 0,
        fetchRequest: false,
        fetchError: null
      }
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
          constructorIngredients: [...state.constructorIngredients].filter(item => item.ingredientUuid !== action.payload)
      }
    }
    case SORT_INGREDIENTS: {
      return {
          ...state,
          constructorIngredients: action.payload
      }
  }
    default:
      return state
  }
}