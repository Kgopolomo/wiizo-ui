import { combineReducers, configureStore } from "@reduxjs/toolkit"
import authReducer from "./../feature/auth/auth"

import messageReducer from "./../feature/message"
import updateUserReducer from "../feature/user/UserSlice"

import storage from 'redux-persist/lib/storage'
import {persistReducer} from 'redux-persist'

const persistConfig = {
    key:'root',
    version:1,
    storage
};

const reducer = combineReducers({
    auth: authReducer,
    message: messageReducer,
    updateUser: updateUserReducer
});

const persistedReducer = persistReducer(persistConfig, reducer);


export const store = configureStore({
    reducer: persistedReducer
})
