import React from "react";
import axios, {AxiosError} from "axios";
import {AnyAction, createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

/*--------------------------initial------------------------*/

type Photo = {
    id: number,
    albumId: number,
    title: string,
    url: string,
    thumbnailUrl: string,
}


type Album = {
    id: number,
    title: string,
}
type PhotoState = {
    photos: Photo[],
    currentId: number | null,
    direction: string | null,
}

type AlbumState = {
    albums: Album[],
}

type ServerState = {
    status: string,
    error: null | string,
    fetching: boolean,
}

let initialState: PhotoState & AlbumState & ServerState = {
    photos: [],
    albums: [],
    currentId: null,
    direction: null,
    status: '',
    error: null,
    fetching: false,
}

/*-------------------------Thunk-----------------------------*/

export const getAlbumsThunkCreate = createAsyncThunk<Album[], undefined, { rejectValue: string }>('gallery/getAlbumsThunkCreate', async (_, {rejectWithValue}) => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/albums');
        if (response.status !== 200) {
            throw new Error('server get post error!');
        }
        return response.data;

    } catch (e) {
        const err = e as AxiosError;
        return rejectWithValue(err.message);
    }
})

export const getPhotosAlbumByIdThunkCreate = createAsyncThunk<Photo[], number, { rejectValue: string }>('gallery/getPhotosAlbumByIdThunkCreate', async (id, {rejectWithValue}) => {
    try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/albums/${id}/photos`)
        if (response.status !== 200) {
            throw new Error('server get post error!');
        }
        return response.data;

    } catch (e) {
        const err = e as AxiosError;
        return rejectWithValue(err.message);
    }
})

/*-------------------------Slice-----------------------------*/

const GallerySlice = createSlice({
    name: "gallery",
    initialState,
    reducers: {
        setCurrentId: (state, action: PayloadAction<number | null>) => {
            if (action.payload === null) {
                state.direction = null;
            }
            state.currentId = action.payload;
        },
        changeIdNext: (state) => {
            if (state.currentId != null) {
                state.currentId += 1;
                state.direction = 'next';
            }
        },
        changeIdBack: (state) => {
            if (state.currentId != null) {
                state.currentId -= 1;
                state.direction = 'back';
            }
        },
    },
    extraReducers: builder => {
        builder
            .addCase(getAlbumsThunkCreate.pending, (state, action) => {
                state.status = 'pending';
                state.fetching = true;
            })
            .addCase(getAlbumsThunkCreate.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.albums = action.payload;
                state.fetching = false;
            })
            .addCase(getPhotosAlbumByIdThunkCreate.pending, (state, action) => {
                state.status = 'pending';
                state.fetching = true;
            })
            .addCase(getPhotosAlbumByIdThunkCreate.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.photos = action.payload;
                state.fetching = false;
            })
            .addMatcher(isError, (state, action: PayloadAction<string>) => {
                state.status = 'rejected';
                state.error = action.payload;
            })
    }
})

export const {changeIdNext, changeIdBack, setCurrentId} = GallerySlice.actions;

export default GallerySlice.reducer;

const isError = (action: AnyAction) => {
    return action.type.endsWith('rejected')
};
