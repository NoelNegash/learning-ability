import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import authReducer  from './slices/authSlice'
import deckReducer from './slices/deckSlice'
import { apiSlice } from './slices/apiSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        deck: deckReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})

export default store