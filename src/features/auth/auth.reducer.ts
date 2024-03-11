import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { authAPI, LoginParamsType, ResultCode } from "api/todolists-api"
import { appActions } from "app/app.reducer"
import { clearTasksAndTodolists } from 'common/actions/common.actions'
import { createAppAsyncThunk } from 'utils/create-app-async-thunk'
import { handleServerAppError, handleServerNetworkError } from "utils/error-utils"

const slice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    setLogin: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
      state.isLoggedIn = action.payload.isLoggedIn
    }
  }
})


// thunks

export const login = createAppAsyncThunk<null, { data: LoginParamsType }>(`${slice.name}/login`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
      dispatch(appActions.setAppStatus({ status: "loading" }))
      const res = await authAPI.login(arg.data)
      if (res.data.resultCode === ResultCode.success) {
        dispatch(appActions.setAppStatus({ status: "succeeded" }))
        dispatch(authActions.setLogin({ isLoggedIn: true }))
        return null
      } else {
        handleServerAppError(res.data, dispatch)
        return rejectWithValue(null)
      }
    } catch (error) {
      handleServerNetworkError(error, dispatch)
      return rejectWithValue(null)
    }
  })

export const logout = createAppAsyncThunk<null>(`${slice.name}/logout`, async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI
  try {
    dispatch(appActions.setAppStatus({ status: "loading" }))
    const res = await authAPI.logout()
    if (res.data.resultCode === ResultCode.success) {
      dispatch(clearTasksAndTodolists())
      dispatch(appActions.setAppStatus({ status: "succeeded" }))
      dispatch(authActions.setLogin({ isLoggedIn: false }))
      return null
    } else {
      handleServerAppError(res.data, dispatch)
      return rejectWithValue(null)
    }
  } catch (error) {
    handleServerNetworkError(error, dispatch)
    return rejectWithValue(null)
  }
})

export const authReducer = slice.reducer
export const authActions = slice.actions
export const authThunk = { login, logout }
