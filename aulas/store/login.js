import { createSlice, combineReducers } from "@reduxjs/toolkit";
import createAsyncSlice from "./helper/createAsyncSlice";
import getLocalStorage from "./helper/getLocalStorage";

const token = createAsyncSlice({
  name: "token",
  initialState: {
    loading: false,
    data: getLocalStorage("token", null),
    error: null,
  },
  reducers: {
    fetchSucess: {
      reducer(state, action) {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      },
      prepare(payload) {
        return {
          payload,
          meta: {
            localStorage: {
              key: "token",
              value: payload.token,
            },
          },
        };
      },
    },
  },
  fetchConfig: (user) => ({
    url: "https://dogsapi.origamid.dev/json/jwt-auth/v1/token",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    },
  }),
});

const user = createAsyncSlice({
  name: "user",
  fetchConfig: (token) => ({
    url: "https://dogsapi.origamid.dev/json/api/user",
    options: {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    },
  }),
});

const reducer = combineReducers({ token: token.reducer, user: user.reducer });
export default reducer;

const fetchTokenAction = token.asyncAction;
const fetchUserAction = user.asyncAction;

export const login = (user) => async (dispatch) => {
  try {
    const { payload } = await dispatch(fetchTokenAction(user));
    if (payload.token !== undefined)
      await dispatch(fetchUserAction(payload.token));
  } catch {}
};

export const autoLogin = () => async (dispatch, getState) => {
  const state = getState();
  const token = state.login.token.data;
  if (token) await dispatch(fetchUserAction(token));
};

// Método convencional para a criação de uma função slice async
const slice = createSlice({
  name: "login",
  initialState: {
    token: {
      loading: false,
      data: null,
      error: null,
    },
    user: {
      loading: false,
      data: null,
      error: null,
    },
  },
  reducers: {
    fetchTokenStarted(state) {
      state.token.loading = true;
    },
    fetchTokenSucess(state, payload) {
      state.token.loading = false;
      state.token.data = payload;
      state.token.error = null;
    },
    fetchTokenError(state, payload) {
      state.token.loading = false;
      state.token.data = null;
      state.token.error = payload;
    },
    fetchUserStarted(state) {
      state.user.loading = true;
    },
    fetchUserSucess(state, payload) {
      state.user.loading = false;
      state.user.data = payload;
      state.user.error = null;
    },
    fetchUserError(state, payload) {
      state.user.loading = false;
      state.user.data = null;
      state.user.error = payload;
    },
  },
});

const {
  fetchTokenStarted,
  fetchTokenSucess,
  fetchTokenError,
  fetchUserStarted,
  fetchUserSucess,
  fetchUserError,
} = slice.actions;

const fetchToken = (user) => async (dispatch) => {
  try {
    dispatch(fetchTokenStarted());
    const response = await fetch(
      "https://dogsapi.origamid.dev/json/jwt-auth/v1/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      },
    );

    const data = await response.json();
    return dispatch(fetchTokenSucess(data));
  } catch (error) {
    return dispatch(fetchTokenError(error.message));
  }
};

const fetchUser = (token) => async (dispatch) => {
  try {
    dispatch(fetchUserStarted());
    const response = await fetch("https://dogsapi.origamid.dev/json/api/user", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    const data = await response.json();
    return dispatch(fetchUserSucess(data));
  } catch (error) {
    return dispatch(fetchUserError(error.message));
  }
};

// export const login = (user) => async (dispatch) => {
//   try {
//     const { payload } = await dispatch(fetchToken(user));
//     if (payload.token !== undefined) await dispatch(fetchUser(payload.token));
//   } catch {}
// };

// export default slice.reducer;
