import { SET_USER } from "../actions/actionTypes";

const userFromStorage = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

const initialState = {
  user: userFromStorage,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      localStorage.setItem("user", JSON.stringify(action.payload));
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
