import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import {ResponseCreateUser} from "../../components/utils/api/types";
import {AppState} from "../store";
import {HYDRATE} from "next-redux-wrapper";


export interface UserState {
    data?: ResponseCreateUser | null
}

const initialState: UserState = {
    data: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData: (state, action:PayloadAction<ResponseCreateUser>) => {
            state.data = action.payload
        }
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            state.data = action.payload.user.data
        }
    }
})

export const { setUserData } = userSlice.actions

export const selectUserData = (state: AppState) => state.user.data;

export const userReducer = userSlice.reducer