import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { authAPI, ResultCode } from "api/todolists-api"
import { authActions } from "features/auth/auth.reducer"
import { createAppAsyncThunk } from 'utils/create-app-async-thunk'
import { handleServerNetworkError } from 'utils/error-utils'

const initialState = {
  status: "idle" as RequestStatusType,
  error: null as string | null,
  isInitialized: false,
}

export type AppInitialStateType = typeof initialState
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error
    },
    setAppStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
      state.status = action.payload.status
    },
    setAppIsInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
      state.isInitialized = action.payload.isInitialized
    },
  },
})


export const initializeApp = createAppAsyncThunk<null>(`${slice.name}/initialize`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
      dispatch(appActions.setAppStatus({ status: 'loading' }))
      const res = await authAPI.me()
      if (res.data.resultCode === ResultCode.success) {
        dispatch(authActions.setLogin({ isLoggedIn: true }))
        return null
      } else {
        dispatch(authActions.setLogin({ isLoggedIn: false }))
        return rejectWithValue(null)
      }
    } catch (error) {
      handleServerNetworkError(error, dispatch)
      return rejectWithValue(null)
    } finally {
      dispatch(appActions.setAppStatus({ status: 'succeeded' }))
      dispatch(appActions.setAppIsInitialized({ isInitialized: true }))
    }
  })
export const appReducer = slice.reducer
export const appActions = slice.actions
export const appThunks = { initializeApp }
