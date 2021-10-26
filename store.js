import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./AppSlice"
import thunk from 'redux-thunk';

const store = configureStore({
    reducer: {
        app: appSlice
    },
    middleware: [thunk]
});
export default store;