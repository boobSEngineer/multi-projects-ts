import React from "react";
import {configureStore} from "@reduxjs/toolkit";
import postReducer from "./Slice/post-slicle";
import photoReducer from "./Slice/gallery-slice";
import weatherReducer from "./Slice/weather-slice";

const store = configureStore({
    reducer: {
        post: postReducer,
        gallery: photoReducer,
        weather: weatherReducer,
    }
})
export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
