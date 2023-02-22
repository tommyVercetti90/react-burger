import { ingredientsReducer, initialState} from './ingredients'
import * as types from '../actions/ingredients'
import * as testData from '../../utils/ingredients-test-data'

describe('ingredient reducer', () => {
  it('should return initial state', () => {
      expect(ingredientsReducer(undefined,{})).toEqual(initialState)
  })

  it('should handle GET_INGREDIENTS_REQUEST', () => {
    expect(ingredientsReducer(initialState, {
        type: types.FETCH_INGREDIENTS_REQUEST
    })).toEqual({
        ...initialState,
        fetchRequestIngredients: true
    })
  })
  it('should handle FETCH_INGREDIENTS_SUCCESS', () => {
    expect(ingredientsReducer({
        ...initialState,
        fetchRequestIngredients: true
    }, {
        type: types.FETCH_INGREDIENTS_SUCCESS,
        payload: testData.testAllIngredients
    })).toEqual({
        ...initialState,
        ingredients: testData.testAllIngredients,
        fetchRequestIngredients: false,
    })
  })

  it('should handle FETCH_INGREDIENTS_ERROR', () => {
    expect(ingredientsReducer({
        ...initialState,
        fetchRequestIngredients: true
    }, {
        type: types.FETCH_INGREDIENTS_ERROR
    })).toEqual({
        ...initialState,
        fetchErrorIngredients: true
    })
  })
  it('should handle INGREDIENT_DETAILS', () => {
    expect(ingredientsReducer({
        ...initialState,
        fetchRequestIngredients: true
    }, {
        type: types.INGREDIENT_DETAILS,
        payload: testData.testIngredient
    })).toEqual({
        ...initialState,
        ingredient: testData.testIngredient,
        fetchRequestIngredients: false,
    })
  })
})