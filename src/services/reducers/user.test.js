import { userReducer, initialState} from './user'
import * as types from '../actions/user'
import * as testData from '../../utils/ingredients-test-data'
import { email, name } from "../../utils/auth-test-data";

describe('resetPassword Reducer', () => {
    it('should return initial state', () => {
        expect(userReducer(undefined,{})).toEqual(initialState)
    })
    it('should handle REGISTER_REQUEST', () => {
        expect(userReducer(initialState, {
            type: types.REGISTER_REQUEST
        })).toEqual({
            ...initialState,
            status: null,
            registerRequest: true,
            registerFailure: false
        })
    })
    it('should handle REGISTER_SUCCESS', () => {
        expect(userReducer({
            ...initialState,
        }, {
            type: types.REGISTER_SUCCESS,
            user: {
                email,
                name
            },
        })).toEqual({
            ...initialState,
            status: 'Успешная регистрация',
            user: {
                email,
                name
            },
            registerRequest: false,
            registerSuccess: true,
            registerFailure: false
        })
    })
    it('should handle REGISTER_FAILED', () => {
        expect(userReducer(initialState, {
            type: types.REGISTER_FAILED,
            err: 'Ошибка'
        })).toEqual({
            ...initialState,
            status: 'Ошибка',
            registerRequest: false,
            registerSuccess: false,
            registerFailure: true
        })
    })
    it('should handle LOGIN_REQUEST', () => {
        expect(userReducer(initialState, {
            type: types.LOGIN_REQUEST
        })).toEqual({
            ...initialState,
            loginRequest: true,
            loginFailure: false
        })
    })
    it('should handle LOGIN_SUCCESS', () => {
        expect(userReducer({
            ...initialState,
        }, {
            type: types.LOGIN_SUCCESS,
            user: {
                email,
                name
            },
        })).toEqual({
            ...initialState,
            user: {
                email,
                name
            },
            loginRequest: false,
            loginFailure: false
        })
    })
    it('should handle LOGIN_FAILED', () => {
        expect(userReducer(initialState, {
            type: types.LOGIN_FAILED,
            status: 'Ошибка'
        })).toEqual({
            ...initialState,
            status: 'Ошибка',
            loginRequest: false,
            loginFailure: true,
        })
    })
    it('should handle LOGOUT_REQUEST', () => {
        expect(userReducer(initialState, {
            type: types.LOGOUT_REQUEST
        })).toEqual({
            ...initialState,
            user: null,
            logoutRequest: true,
            logoutFailure: false,
        })
    })
    it('should handle LOGOUT_SUCCESS', () => {
        expect(userReducer({
            ...initialState,
        }, {
            type: types.LOGOUT_SUCCESS,
            res: {
                message: 'Выход из аккаунта'
            }
        })).toEqual({
            ...initialState,
            status: 'Выход из аккаунта',
            logoutRequest: false,
            logoutFailure: false,
        })
    })
    it('should handle LOGOUT_FAILED', () => {
        expect(userReducer({
            ...initialState,
        }, {
            type: types.LOGOUT_FAILED,
            err: 'Ошибка'
        })).toEqual({
            ...initialState,
            status: 'Ошибка',
            logoutRequest: false,
            logoutFailure: true,
        })
    })
    it('should handle GET_USER_REQUEST', () => {
        expect(userReducer(initialState, {
            type: types.GET_USER_REQUEST
        })).toEqual({
            ...initialState,
            getUserRequest: true,
            getUserFailure: false
        })
    })
    it('should handle GET_USER_SUCCESS', () => {
        expect(userReducer({
            ...initialState,
        }, {
            type: types.GET_USER_SUCCESS,
            user: {
                email,
                name
            },
        })).toEqual({
            ...initialState,
            user: {
                email,
                name
            },
            getUserRequest: false,
            getUserFailure: false
        })
    })
    it('should handle GET_USER_FAILED', () => {
        expect(userReducer(initialState, {
            type: types.GET_USER_FAILED,
            err: 'Ошибка'
        })).toEqual({
            ...initialState,
            status: 'Ошибка',
            getUserRequest: false,
            getUserFailure: true
        })
    })
    it('should handle EDIT_USER_REQUEST', () => {
        expect(userReducer(initialState, {
            type: types.EDIT_USER_REQUEST
        })).toEqual({
            ...initialState,
            editUserRequest: true,
            editUserFailure: false,
            editUserSuccess: true,
        })
    })
    it('should handle EDIT_USER_SUCCESS', () => {
        expect(userReducer({
            ...initialState,
        }, {
            type: types.EDIT_USER_SUCCESS,
            user: {
                email,
                name
            },
        })).toEqual({
            ...initialState,
            user: {
                email,
                name
            },
            editUserRequest: false,
            editUserSuccess: false,
            editUserFailure: false
        })
    })
    it('should handle EDIT_USER_FAILED', () => {
        expect(userReducer(initialState, {
            type: types.EDIT_USER_FAILED,
        })).toEqual({
            ...initialState,
            editUserRequest: false,
            editUserFailure: true
        })
    })
})