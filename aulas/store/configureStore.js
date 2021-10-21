import { configureStore, combineReducers } from "@reduxjs/toolkit";
import contador from "./contador";
import modal from "./modal";
import logger from "./middleware/logger";
import localStorage from "./middleware/localStorage";
import login from "./login";

const reducer = combineReducers({ contador, modal, login });
const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorage),
});

export default store;
