import { configureStore, combineReducers } from "@reduxjs/toolkit";
import login from "./login";
import photos from "./photos";

const reducer = combineReducers({ login, photos });
const store = configureStore({ reducer: reducer });

export default store;
