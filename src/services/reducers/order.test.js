import { orderReducer, initialState} from './order'
import * as types from '../actions/order'
import * as testData from '../../utils/ingredients-test-data'

describe('order reducer', () => {
    it('should return initial state', () => {
        expect(orderReducer(undefined,{})).toEqual(initialState)
    })
    it('should handle FETCH_ORDER_REQUEST', () => {
        expect(orderReducer(initialState, {
            type: types.FETCH_ORDER_REQUEST
        })).toEqual({
            ...initialState,
            fetchRequestOrder: true,
            fetchErrorOrder: false
        })
    })
    it('should handle FETCH_ORDER_SUCCESS', () => {
        expect(orderReducer({
            ...initialState,
            fetchRequestOrder: true
        }, {
            type: types.FETCH_ORDER_SUCCESS,
            payload: 666777
        })).toEqual({
            ...initialState,
            orderDetails: 666777,
            fetchRequestOrder: false,
        })
    })
    it('should handle FETCH_ORDER_ERROR', () => {
        expect(orderReducer({
            ...initialState,
            fetchRequestOrder: true
        }, {
            type: types.FETCH_ORDER_ERROR,
            payload: "Error"
        })).toEqual({
            ...initialState,
            fetchRequestOrder: false,
            fetchErrorOrder: "Error",
        })
    })
})