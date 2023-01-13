import { createSlice } from "@reduxjs/toolkit";

const LoginSlice = createSlice({
  name: "login",
  initialState: {
      login: null, //nombre de un state. (array de movies)
      id: '' 
  },

  reducers: {
    setLogin(state, action) {
      state.login = action.payload; //guarda el token
    

      localStorage.setItem(
        "token",
        JSON.stringify({
          token: action.payload,
        })
      );
    },

    setLoginId(state, action) {
      state.id = action.payload;
    

      localStorage.setItem(
        "id",
        JSON.stringify({
          id: action.payload,
        })
      );

    },

    setLoginNull(state, action) {
      state.login = null;
      state.id = '';
      localStorage.removeItem("token");
      localStorage.removeItem("id");
    },
  },
});

export const loginActions = LoginSlice.actions;

export default LoginSlice;
