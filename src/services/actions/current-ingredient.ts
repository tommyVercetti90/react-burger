import type { TIngredient } from "../types/types";

export const SET_CURRENT_INGREDIENT: 'SET_CURRENT_INGREDIENT' = 'SET_CURRENT_INGREDIENT';
export const RESET_CURRENT_INGREDIENT: 'RESET_CURRENT_INGREDIENT' = 'RESET_CURRENT_INGREDIENT';

export interface ISetCurrentIngredientAction {
  readonly type: typeof SET_CURRENT_INGREDIENT;
  readonly currentIngredient: TIngredient;
}

export interface IResetCurrentIngredient {
  readonly type: typeof RESET_CURRENT_INGREDIENT
}

export type TCurrentIngredientActions = 
  | ISetCurrentIngredientAction
  | IResetCurrentIngredient;

export const setCurrentIngredient = (ingredient: TIngredient): ISetCurrentIngredientAction  => ({
  type: SET_CURRENT_INGREDIENT,
  currentIngredient: ingredient
})

export const resetCurrentIngredient = (): IResetCurrentIngredient => ({
  type: RESET_CURRENT_INGREDIENT
})