import { constructorReducer, initialState} from './constructor'
import * as types from '../actions/constructor'
import * as testData from '../../utils/ingredients-test-data'

describe('constructor reducer', () => {
    it('Стейт по умолчанию', () => {
        expect(constructorReducer(undefined, {})).toEqual(initialState)
    })
    it("Добавление ингредиента в заказ", () => {
        expect(constructorReducer({
            ...initialState,
            constructorIngredients: testData.testConstructorIngredients
        }, {
                type: types.ADD_INGREDIENT,
                payload: testData.testIngredient,
            })).toEqual({
                ...initialState,
                constructorIngredients: testData.testConstructorIngredientsAfterAdding,
            })
    });
    it("Добавление булки в заказ", () => {
        expect(constructorReducer(undefined, {
                type: types.ADD_BUN,
                payload: testData.testConstructorBun,
            })).toEqual({
            ...initialState,
            constructorBun: testData.testConstructorBun,
        })
    });
    it("Удаление ингредиента из заказа", () => {
        expect(constructorReducer({
            ...initialState,
            constructorIngredients: testData.testConstructorIngredients
        }, {
                type: types.REMOVE_INGREDIENT,
                payload: "be1037a9-a0d5-4cb4-86f9-22e85ae2be77"
            })).toEqual({
                ...initialState,
                constructorIngredients: testData.testConstructorIngredientsAfterRemoval,
            })
    });
    it("Очистка заказа", () => {
        expect(constructorReducer({
            ...initialState,
            constructorIngredients: testData.testConstructorIngredients,
            constructorBun: testData.testConstructorBun,
        }, { type: types.CLEAR_INGREDIENTS })).toEqual({
            ...initialState,
            constructorIngredients: [],
            constructorBun: null,
        })
    });
    it("Сортировка ингредиента", () => {
        expect(constructorReducer({
            ...initialState,
            constructorIngredients: testData.testConstructorIngredients
        }, {
                type: types.SORT_INGREDIENTS,
                payload: testData.testConstructorIngredients,
            })).toEqual({
                ...initialState,
                constructorIngredients: testData.testConstructorIngredients,
            })
    });
})