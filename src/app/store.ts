import { UnknownAction, configureStore } from "@reduxjs/toolkit"
import { tasksReducer } from 'features/TodolistsList/tasksSlice'
import { combineReducers } from "redux"
import { ThunkAction, ThunkDispatch } from "redux-thunk"
import { authReducer } from "../features/Login/authSlice"
import { todolistsReducer } from "../features/TodolistsList/todolistsSlice"
import { appReducer } from "./app-reducer"

const rootReducer = combineReducers({
	tasks: tasksReducer,
	todolists: todolistsReducer,
	app: appReducer,
	auth: authReducer,
})


export const store = configureStore({ reducer: rootReducer })

export type AppRootStateType = ReturnType<typeof store.getState>

// ❗ UnknownAction вместо AnyAction
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, UnknownAction>

// export type AppDispatch = typeof store.dispatch
// ❗ UnknownAction вместо AnyAction
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, UnknownAction>
