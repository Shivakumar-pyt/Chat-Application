import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice';
import chatReducer from './chatSlice';
import messageReducer from './messageSlice';
import { persistReducer, persistStore } from "redux-persist";
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({
    user: userReducer,
    chat: chatReducer,
    message: messageReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default configureStore({
    reducer: persistedReducer,
})
