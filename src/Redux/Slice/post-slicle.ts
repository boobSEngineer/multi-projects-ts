import {createSlice, createAsyncThunk, PayloadAction, AnyAction} from '@reduxjs/toolkit';
import axios, {AxiosError} from "axios";

type Post = {
    id: number,
    userId: number,
    title: string,
    body: string,
}

type PostsState = {
    posts: Post[],
    postsCopy: Post[],
    status: string,
    error: string | null,
}


let initialState: PostsState = {
    posts: [],
    postsCopy: [],
    status: '',
    error: null,

}

export const getPostsThunkCreate = createAsyncThunk<Post[], undefined, { rejectValue: string }>(
    'post/getPostsThunkCreate',
    async (_, {rejectWithValue}) => {
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=30');
            if (response.status !== 200) {
                throw new Error('server get post error!');
            }
            return (response.data);
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.message);
        }
    }
)
export const deletePostThunkCreate = createAsyncThunk<number, number, { rejectValue: string }>(
    'post/deletePostThunkCreate',
    async (id, {rejectWithValue}) => {
        try {
            const response = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
            if (response.status !== 200) {
                throw new Error('server delete post error!');
            }
            return id;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.message);
        }
    }
)

export const getPostByIdThunkCreate = createAsyncThunk<Post[], number, { rejectValue: string }>(
    'post/findPostByIdThunkCreate',
    async (id, {rejectWithValue}) => {
        try {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
            if (response.status !== 200) {
                throw new Error('server delete post error!');
            }
            return [response.data]
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.message);
        }
    }
)

const PostSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        filterPostsByAscending(state) {
            state.posts = state.posts.sort((a, b) => a.userId - b.userId);
        },
        filterPostsByDescending(state) {
            state.posts = state.posts.sort((a, b) => b.userId - a.userId);
        },
        searchPostByString(state, action: PayloadAction<string>) {
            let findPosts: Post[] = [];
            state.postsCopy.forEach(p => {
                if (p.title.indexOf(action.payload) !== -1 || p.body.indexOf(action.payload) !== -1) {
                    findPosts.push(p);
                }
            })
            state.posts = findPosts;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPostsThunkCreate.pending, (state, action) => {
                state.status = 'pending';
                state.error = null;
            })
            .addCase(getPostsThunkCreate.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.error = null;
                state.posts = action.payload;
                state.postsCopy = action.payload;
            })
            .addCase(getPostByIdThunkCreate.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.posts = action.payload;
                state.error = null;
            })
            .addCase(deletePostThunkCreate.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.error = null;
                state.posts = state.posts.filter(p => {
                    return p.id !== action.payload;
                })
                state.postsCopy = state.postsCopy.filter(p => {
                    return p.id !== action.payload;
                })
            })
            .addMatcher(isError, (state, action: PayloadAction<string>) => {
                state.status = 'rejected';
                state.error = action.payload;
            })
    },
});

export const {filterPostsByAscending, filterPostsByDescending, searchPostByString } = PostSlice.actions;

export default PostSlice.reducer;

const isError = (action: AnyAction) => {
    return action.type.endsWith('rejected');
}
