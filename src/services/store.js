import { createStore, applyMiddleware  } from "redux";
import { reducer } from "./reducers/reducer"
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";

export const initStore = (initialState) => {
    const store = createStore(
        reducer,
        initialState,
        composeWithDevTools(applyMiddleware(thunk)))
    return store
}
