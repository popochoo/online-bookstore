import { Reducer, combineReducers, configureStore } from '@reduxjs/toolkit'
import {
	FLUSH,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
	REHYDRATE,
	persistReducer
} from 'redux-persist'
import persistStore from 'redux-persist/es/persistStore'
import storage from 'redux-persist/lib/storage'

import { cartSlice } from './cart/cart.slice'

const persistConfig = {
	key: 'bookstore',
	storage,
	whitelist: ['cart']
}

const combinedReducers = combineReducers({
	cart: cartSlice.reducer
})

const persistedReducer = persistReducer(persistConfig, combinedReducers)

const rootReducer: Reducer<ReturnType<typeof combinedReducers>> =
	typeof window !== 'undefined'
		? (persistedReducer as unknown as Reducer<
				ReturnType<typeof combinedReducers>
			>)
		: combinedReducers

export const store = configureStore({
	reducer: rootReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [
					FLUSH,
					REHYDRATE,
					PAUSE,
					PERSIST,
					PURGE,
					REGISTER
				]
			}
		})
})

export const persistor = persistStore(store)

export type TypeRootState = ReturnType<typeof combinedReducers>
