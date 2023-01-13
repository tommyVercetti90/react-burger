import { createStore, applyMiddleware  } from "redux";
import { rootReducer } from "./reducers/rootReducer"
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";

export const initStore = (initialState) => {
    const store = createStore(
        rootReducer,
        initialState,
        composeWithDevTools(applyMiddleware(thunk)))
    return store
}
