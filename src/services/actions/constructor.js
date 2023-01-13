import { v4 as uuid} from "uuid"
export const ADD_INGREDIENT = 'ADD_INGREDIENT'
export const ADD_BUN = 'ADD_BUN'
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT'
export const SORT_INGREDIENTS = 'SORT_INGREDIENTS'
export const CLEAR_INGREDIENTS = 'CLEAR_INGREDIENTS'


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

export const clearIngredients = () => {
  return {
    type: CLEAR_INGREDIENTS
  }
} 
