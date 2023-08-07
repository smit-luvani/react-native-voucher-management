import { CLEAR_USER, SET_USER } from "../types";

const initialState = {
  user: null,
}

function userReducer(state = initialState, action) {
  let { type, payload } = action;
  switch (type) {
    case SET_USER: {
      return Object.assign({}, { ...state }, { user: payload });
    }
    case CLEAR_USER: {
      return { user: null }
    }
    default:
      return state;
  }
}

export default userReducer;