import { createSlice } from "@reduxjs/toolkit"
import { appActions } from "app/app.reducer"
import { createAppAsyncThunk, handleServerAppError } from "common/utils"
import { thunkTryCatch } from 'common/utils/thunk-try-catch'
import { authAPI, LoginParamsType } from "features/auth/auth.api"

const slice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state) => {
        state.isLoggedIn = true
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoggedIn = false
      })
      .addCase(initializeApp.fulfilled, (state) => {
        state.isLoggedIn = true
      })
  },
})

// thunks

// const login = createAppAsyncThunk<undefined, LoginParamsType>(
//   `${slice.name}/login`,
//   async (arg, thunkAPI) => {
//     const { dispatch, rejectWithValue } = thunkAPI
//     try {
//       dispatch(appActions.setAppStatus({ status: "loading" }))
//       const res = await authAPI.login(arg)
//       if (res.data.resultCode === 0) {
//         dispatch(appActions.setAppStatus({ status: "succeeded" }))
//         return undefined
//       } else {
//         const isShowAppError = !res.data.fieldsErrors.length
//         handleServerAppError(res.data, dispatch, isShowAppError)
//         return rejectWithValue(res.data)
//       }
//     } catch (e) {
//       handleServerNetworkError(e, dispatch)
//       return rejectWithValue(null)
//     }
//   },
// )

const login = createAppAsyncThunk<undefined, LoginParamsType>(`${slice.name}/login`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    return thunkTryCatch(thunkAPI, async () => {
      const res = await authAPI.login(arg)
      if (res.data.resultCode === 0) {
        return undefined
      }
      else {
        const isShowAppError = !res.data.fieldsErrors.length
        handleServerAppError(res.data, dispatch, isShowAppError)
        return rejectWithValue(res.data)
      }
    })
  }
)

// const logout = createAppAsyncThunk<undefined>(`${slice.name}/logout`, async (_, thunkAPI) => {
//   const { dispatch, rejectWithValue } = thunkAPI
//   try {
//     dispatch(appActions.setAppStatus({ status: "loading" }))
//     const res = await authAPI.logout()
//     if (res.data.resultCode === 0) {
//       dispatch(appActions.setAppStatus({ status: "succeeded" }))
//       return undefined
//     } else {
//       handleServerAppError(res.data, dispatch)
//       return rejectWithValue(null)
//     }
//   } catch (e) {
//     handleServerNetworkError(e, dispatch)
//     return rejectWithValue(null)
//   }
// })

const logout = createAppAsyncThunk<undefined>(`${slice.name}/logout`, async (_, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI
  return thunkTryCatch(thunkAPI, async () => {
    const res = await authAPI.logout()
    if (res.data.resultCode === 0) {
      return undefined
    } else {
      handleServerAppError(res.data, dispatch)
      return rejectWithValue(null)
    }
  })
})
// const initializeApp = createAppAsyncThunk<{ isLoggedIn: boolean }>(`${slice.name}/initializeApp`,
//   async (_, thunkAPI) => {
//     const { dispatch, rejectWithValue } = thunkAPI
//     try {
//       const res = await authAPI.me()
//       if (res.data.resultCode === 0) {
//         return { isLoggedIn: true }
//       } else {
//         return rejectWithValue(null)
//       }
//     } catch (e) {
//       handleServerNetworkError(e, dispatch)
//       return rejectWithValue(null)
//     } finally {
//        dispatch(appActions.setAppInitialized({ isInitialized: true }));
//      }
//   })

const initializeApp = createAppAsyncThunk<undefined>(`${slice.name}/initializeApp`,
  async (_, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    return thunkTryCatch(thunkAPI, async () => {
      const res = await authAPI.me()
      if (res.data.resultCode === 0) {
        return undefined
      } else {
        return rejectWithValue(null)
      }
    }).finally(() => {
      dispatch(appActions.setAppInitialized({ isInitialized: true }))
    })
  })

export const authReducer = slice.reducer
export const authActions = slice.actions
export const authThunks = { login, logout, initializeApp }
