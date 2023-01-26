export const SET_CURRENT_INGREDIENT = 'SET_CURRENT_INGREDIENT';
export const RESET_CURRENT_INGREDIENT = 'RESET_CURRENT_INGREDIENT';

export const setCurrentIngredient = (ingredient)  => ({
  type: SET_CURRENT_INGREDIENT,
  currentIngredient: ingredient
})

export const resetCurrentIngredient = () => ({
  type: RESET_CURRENT_INGREDIENT
})