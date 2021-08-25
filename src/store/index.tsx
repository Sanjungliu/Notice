import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

const initialState = {
  user: "",
  confirmationResult: {},
  case: {},
  flag: false,
  API: [],
};

function reducer(state = initialState, action: any) {
  const { type, payload } = action;
  switch (type) {
    case "SET_USER":
      return { ...state, user: payload };
    case "SET_CONFIRMATION_RESULT":
      return { ...state, confirmationResult: payload };
    case "SET_CASE":
      return { ...state, case: payload };
    case "SET_FLAG":
      return { ...state, flag: payload };
    case "SET_API":
      return { ...state, API: payload };
    default:
      return state;
  }
}

const store = createStore(reducer, applyMiddleware(thunk));
export default store;

export type RootState = ReturnType<typeof reducer>;
