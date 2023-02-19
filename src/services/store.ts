import { compose, createStore, applyMiddleware } from 'redux';
import { rootReducer } from './reducers/rootReducer';
import thunk from 'redux-thunk';
import { socketMiddleware } from './middleware/socketMiddleware';

import { 
  connect as OrderwWsConnect,
  disconnect as OrdersWsDisconnect,
  wsConnecting as OrdersWsConnecting,
  wsOpen as OrdersWsOpen,
  wsClose as OrdersWsClose,
  wsMessage as OrdersWsMessage,
  wsError as OrdersWsError
} from './actions/ws-orders';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const wsActions = {
    wsConnect: OrderwWsConnect,
    wsDisconnect: OrdersWsDisconnect,
    wsConnecting: OrdersWsConnecting,
    onOpen: OrdersWsOpen,
    onClose: OrdersWsClose,
    onError: OrdersWsError,
    onMessage: OrdersWsMessage
  };

export const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsActions)));

export const store = createStore(rootReducer, enhancer);