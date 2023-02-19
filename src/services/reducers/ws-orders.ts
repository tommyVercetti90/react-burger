import { createReducer } from "@reduxjs/toolkit";
import { wsClose, wsConnecting, wsError, wsMessage, wsOpen } from "../actions/ws-orders";
import { WsOrders } from "../types/types";

type TWsOrdersType = {
  status: string;
  error: string;
  orders: WsOrders | null;
};

const initialState: TWsOrdersType = {
  status: 'offline',
  error: '',
  orders: null,
};

export const WsOrdersReducer = createReducer(initialState, builder => {
  builder
    .addCase(wsConnecting, (state) => {
      state.status = 'connecting';
    })
    .addCase(wsOpen, (state) => {
      state.status = 'online';
      state.error = '';
    })
    .addCase(wsClose, (state) => {
      state.status = 'offline';
    })
    .addCase(wsError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(wsMessage, (state, action) => {
      state.orders = action.payload;
      // state.orders.orders = [];
    })

})