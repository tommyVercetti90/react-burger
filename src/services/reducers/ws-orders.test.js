import { wsClose, wsConnecting, wsError, wsMessage, wsOpen } from '../actions/ws-orders';
import { WsOrdersReducer } from './ws-orders';

describe('WsOrders Reducer,', () => {
  it('should handle WS_CONNECTING', () => {
    const action = { type: wsConnecting.type };
    const expectedState = {
      status: 'connecting',
      error: '',
      orders: null,
    }
    expect(WsOrdersReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle WS_OPEN', () => {
    const action = { type: wsOpen.type };
    const expectedState = {
      status: 'online',
      error: '',
    }
    expect(WsOrdersReducer({}, action)).toEqual(expectedState);
  });

  it('should handle WS_CLOSE', () => {
    const action = { type: wsClose.type };
    const expectedState = {
      status: 'offline',
    }
    expect(WsOrdersReducer({}, action)).toEqual(expectedState);
  });

  it('should handle WS_ERROR', () => {
    const action = { 
      type: wsError.type,
      payload: 'Error! Something went wrong'
    };
    const expectedState = {
      error: 'Error! Something went wrong',
    }
    expect(WsOrdersReducer({}, action)).toEqual(expectedState);
  });

  it('should handle WS_MESSAGE', () => {
    const action = {
      type: wsMessage.type,
      payload: {
        orders: [
          { 
            id: 1, 
            name: 'order1' 
          }, 
          { 
            id: 2, 
            name: 'order2' 
          }
        ]
      }
    };
    const expectedState = {
      orders: {
        orders: [
          { 
            id: 1, 
            name: 'order1' 
          }, 
          { 
            id: 2, 
            name: 'order2' 
          }
        ]
      }
    }
    expect(WsOrdersReducer({} , action)).toEqual(expectedState);
  });
});