import { createAction } from "@reduxjs/toolkit";
import { WsOrders } from "../types/types";

export const connect = createAction<string, 'ORDERS_CONNECT'>('ORDERS_CONNECT');
export const disconnect = createAction('ORDERS_DISCONNECT');
export const wsConnecting = createAction('ORDERS_WS_CONNECTING');
export const wsOpen = createAction('ORDERS_WS_OPEN');
export const wsClose = createAction('ORDERS_WS_CLOSE');
export const wsMessage = createAction<WsOrders, 'ORDERS_WS_MESSAGE'>('ORDERS_WS_MESSAGE');
export const wsError = createAction<string, 'ORDERS_WS_ERROR'>('ORDERS_WS_ERROR');

export type TWsOrdersActions = ReturnType<typeof connect>
                                | ReturnType<typeof disconnect> 
                                | ReturnType<typeof wsConnecting> 
                                | ReturnType<typeof wsOpen> 
                                | ReturnType<typeof wsClose> 
                                | ReturnType<typeof wsMessage> 
                                | ReturnType<typeof wsError>;