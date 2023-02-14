import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { ActionCreator } from 'redux';
import { store } from '../store';
import { TCurrentIngredientActions } from '../actions/current-ingredient';
import { TIngredientsActions } from '../actions/ingredients';
import { TOrderActions } from '../actions/order';
import { TResetPasswordActions } from '../actions/reset-password';
import { TConstructor } from '../actions/constructor';
import { TUserActions } from '../actions/user';
import { TWsOrdersActions } from '../actions/ws-orders';
import { rootReducer } from '../reducers/rootReducer';

type TApplicationActions = 
  | TCurrentIngredientActions
  | TIngredientsActions
  | TOrderActions
  | TResetPasswordActions
  | TConstructor
  | TUserActions
  | TWsOrdersActions;

export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, RootState, never, TApplicationActions>
>;
export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>;