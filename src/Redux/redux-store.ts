import React from "react";
import {configureStore} from "@reduxjs/toolkit";
import postReducer from "./Slice/post-slicle";
import photoReducer from "./Slice/gallery-slice";

const store = configureStore({
    reducer: {
        post: postReducer,
        gallery: photoReducer,
    }
})
export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
