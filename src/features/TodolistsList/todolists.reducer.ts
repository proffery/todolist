import { ResultCode, todolistsAPI, TodolistType } from "api/todolists-api"
import { appActions, RequestStatusType } from "app/app.reducer"
import { handleServerAppError, handleServerNetworkError } from "utils/error-utils"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { clearTasksAndTodolists } from "common/actions/common.actions"
import { createAppAsyncThunk } from 'utils/create-app-async-thunk'

const initialState: TodolistDomainType[] = []

const slice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    changeTodolistFilter: (state, action: PayloadAction<{ id: string; filter: FilterValuesType }>) => {
      const todo = state.find((todo) => todo.id === action.payload.id)
      if (todo) {
        todo.filter = action.payload.filter
      }
    },
    changeTodolistEntityStatus: (state, action: PayloadAction<{ id: string; entityStatus: RequestStatusType }>) => {
      const todo = state.find((todo) => todo.id === action.payload.id)
      if (todo) {
        todo.entityStatus = action.payload.entityStatus
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(clearTasksAndTodolists, () => {
      return []
    })
      .addCase(fetchTodolists.fulfilled, (state, action) => {
        return action.payload.todolists.map((tl) => ({ ...tl, filter: "all", entityStatus: "idle" }))
      })
      .addCase(removeTodolist.fulfilled, (state, action) => {
        const index = state.findIndex((todo) => todo.id === action.payload.todolistId)
        if (index !== -1) state.splice(index, 1)
      })
      .addCase(addTodolist.fulfilled, (state, action) => {
        const newTodolist: TodolistDomainType = { ...action.payload.todolist, filter: "all", entityStatus: "idle" }
        state.unshift(newTodolist)
      })
      .addCase(changeTodolistTitle.fulfilled, (state, action) => {
        const todo = state.find((todo) => todo.id === action.payload.todolistId)
        if (todo) {
          todo.title = action.payload.title
        }
      })
  },
})

// thunks
export const fetchTodolists = createAppAsyncThunk<{ todolists: TodolistType[] }>
  (`${slice.name}/fetchTodolists`, async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
      dispatch(appActions.setAppStatus({ status: "loading" }))
      const res = await todolistsAPI.getTodolists()
      const todolists = res.data
      dispatch(appActions.setAppStatus({ status: "succeeded" }))
      return { todolists }
    } catch (error) {
      handleServerNetworkError(error, dispatch)
      return rejectWithValue(null)
    }
  })

export const removeTodolist = createAppAsyncThunk<{ todolistId: string }, string>
  (`${slice.name}/removeTodolist`, async (todolistId, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
      dispatch(appActions.setAppStatus({ status: "loading" }))
      dispatch(todolistsActions.changeTodolistEntityStatus({ id: todolistId, entityStatus: "loading" }))
      const res = await todolistsAPI.deleteTodolist(todolistId)
      if (res.data.resultCode === ResultCode.success) {
        dispatch(appActions.setAppStatus({ status: "succeeded" }))
        return { todolistId }
      } else {
        handleServerAppError(res.data, dispatch)
        return rejectWithValue(null)
      }
    } catch (error) {
      handleServerNetworkError(error, dispatch)
      return rejectWithValue(null)
    }
  })

export const addTodolist = createAppAsyncThunk<{ todolist: TodolistType }, string>(`${slice.name}/addTodolist`,
  async (title, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
      dispatch(appActions.setAppStatus({ status: "loading" }))
      const res = await todolistsAPI.createTodolist(title)
      dispatch(appActions.setAppStatus({ status: "succeeded" }))
      return { todolist: res.data.data.item }
    } catch (error) {
      handleServerNetworkError(error, dispatch)
      return rejectWithValue(null)
    }
  })

export const changeTodolistTitle = createAppAsyncThunk<{ todolistId: string, title: string }, { todolistId: string, title: string }>
  (`${slice.name}/changeTodolistTitle`, (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
      dispatch(appActions.setAppStatus({ status: "loading" }))
      todolistsAPI.updateTodolist(arg)
      dispatch(appActions.setAppStatus({ status: "succeeded" }))
      return { todolistId: arg.todolistId, title: arg.title }
    } catch (error) {
      handleServerNetworkError(error, dispatch)
      return rejectWithValue(null)
    }
  })

// types
export type FilterValuesType = "all" | "active" | "completed"
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType
  entityStatus: RequestStatusType
}

export const todolistsReducer = slice.reducer
export const todolistsActions = slice.actions
export const todolistsThunks = { fetchTodolists, removeTodolist, addTodolist, changeTodolistTitle }