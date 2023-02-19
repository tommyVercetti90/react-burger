import { combineReducers } from 'redux';
import { constructorReducer } from './constructor';
import { ingredientsReducer } from './ingredients';
import { orderReducer } from './order';
import { userReducer } from './user';
import { resetPasswordReducer } from './reset-password';
import { currentIngredientReducer } from './current-ingredient';
import { WsOrdersReducer } from './ws-orders';

export const rootReducer = combineReducers({
    constructorReducer: constructorReducer,
    ingredientsReducer: ingredientsReducer,
    orderReducer: orderReducer,
    userReducer: userReducer,
    resetPasswordReducer: resetPasswordReducer,
    currentIngredientReducer: currentIngredientReducer,
    WsOrdersReducer: WsOrdersReducer
  });