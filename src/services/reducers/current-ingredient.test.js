import { currentIngredientReducer, initialState} from './current-ingredient'
import * as types from '../actions/current-ingredient'
import * as testData from '../../utils/ingredients-test-data'

describe('current ingredient reducer', () => {
  it('should return initial state', () => {
      expect(currentIngredientReducer(undefined,{})).toEqual(initialState)
  })
  it('should handle SET_CURRENT_INGREDIENT', () => {
    expect(currentIngredientReducer(initialState, {
        type: types.SET_CURRENT_INGREDIENT,
        currentIngredient: testData.testIngredient
    })).toEqual({
        currentIngredient: testData.testIngredient
    })
  })

  it('should handle RESET_CURRENT_INGREDIENT', () => {
    expect(currentIngredientReducer({
        currentIngredient: testData.testIngredient
    }, {
        type: types.RESET_CURRENT_INGREDIENT
    })).toEqual(initialState)
  })  
})