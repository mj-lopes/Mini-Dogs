import { combineReducers } from "@reduxjs/toolkit";
import createAsyncSlice from "./helper/createAsyncSlice";
import { removePhotos } from "./photos";

const token = createAsyncSlice({
  name: "token",
  initialState: {
    loading: false,
    data: null,
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
    tokenLogout(state) {
      state.data = null;
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
  reducers: {
    userLogout(state) {
      state.data = null;
    },
  },
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

const fetchTokenAction = token.asyncAction;
const fetchUserAction = user.asyncAction;

export const login = (user) => async (dispatch) => {
  try {
    const { payload } = await dispatch(fetchTokenAction(user));
    if (payload.token !== undefined)
      await dispatch(fetchUserAction(payload.token));
  } catch {}
};

const { userLogout } = user.actions;
const { tokenLogout } = token.actions;

export const logout = () => (dispatch) => {
  dispatch(userLogout());
  dispatch(tokenLogout());
  dispatch(removePhotos());
};

const reducer = combineReducers({ token: token.reducer, user: user.reducer });
export default reducer;
