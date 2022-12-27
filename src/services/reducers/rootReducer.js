import { combineReducers } from 'redux';
import { constructorReducer } from './constructor';
import { ingredientsReducer } from './ingredients';
import { orderReducer } from './order';

export const rootReducer = combineReducers({
    constructorReducer: constructorReducer,
    ingredientsReducer: ingredientsReducer,
    orderReducer: orderReducer,
  });