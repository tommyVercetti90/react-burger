import { resetPasswordReducer, initialState} from './reset-password'
import * as types from '../actions/reset-password'
import * as testData from '../../utils/ingredients-test-data'

describe('resetPassword Reducer', () => {
    it('should return initial state', () => {
        expect(resetPasswordReducer(undefined,{})).toEqual(initialState)
    })
    it('should handle FORGOT_PASSWORD_REQUEST', () => {
        expect(resetPasswordReducer(initialState, {
            type: types.FORGOT_PASSWORD_REQUEST
        })).toEqual({
            ...initialState,
            status: 'Идет отправка данных',
            forgotRequest: true,
            fargotSuccess: false,
            forgotFailed: false
        })
    })
    it('should handle FORGOT_PASSWORD_SUCCESS', () => {
        expect(resetPasswordReducer(initialState, {
            type: types.FORGOT_PASSWORD_SUCCESS,
            status: 'Пароль успешно изменен'
        })).toEqual({
            ...initialState,
            status: 'Пароль успешно изменен',
            forgotRequest: false,
            fargotSuccess: true,
            forgotFailed: false
        })
    })
    it('should handle FORGOT_PASSWORD_FAILED', () => {
        expect(resetPasswordReducer(initialState, {
            type: types.FORGOT_PASSWORD_FAILED,
            err: 'Ошибка'
        })).toEqual({
            ...initialState,
            status: 'Ошибка',
            forgotRequest: false,
            fargotSuccess: false,
            forgotFailed: true
        })
    })
    it('should handle RESET_PASSWORD_REQUEST', () => {
        expect(resetPasswordReducer(initialState, {
            type: types.RESET_PASSWORD_REQUEST,
            status: 'Идет отправка данных'
        })).toEqual({
            ...initialState,
            status: 'Идет отправка данных',
            resetRequest: true,
            resetFailure: false
        })
    })
    it('should handle RESET_PASSWORD_SUCCESS', () => {
        expect(resetPasswordReducer(initialState, {
            type: types.RESET_PASSWORD_SUCCESS,
            status: 'Пароль успешно сброшен'
        })).toEqual({
            ...initialState,
            status: 'Пароль успешно сброшен',
            resetSuccess: true,
            resetRequest: false,
            resetFailure: false
        })
    })
    it('should handle RESET_PASSWORD_FAILED', () => {
        expect(resetPasswordReducer(initialState, {
            type: types.RESET_PASSWORD_FAILED,
            err: 'Ошибка'
        })).toEqual({
            ...initialState,
            status: 'Ошибка',
            resetRequest: false,
            resetSuccess: false,
            resetFailure: true
        })
    })
})