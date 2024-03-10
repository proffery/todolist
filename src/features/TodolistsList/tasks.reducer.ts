import { createSlice } from "@reduxjs/toolkit"
import { ResultCode, TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType } from "api/todolists-api"
import { appActions } from "app/app.reducer"
import { clearTasksAndTodolists } from "common/actions/common.actions"
import { todolistsActions } from "features/TodolistsList/todolists.reducer"
import { createAppAsyncThunk } from 'utils/create-app-async-thunk'
import { handleServerAppError, handleServerNetworkError } from "utils/error-utils"

const initialState: TasksStateType = {}

const slice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(todolistsActions.addTodolist, (state, action) => {
        state[action.payload.todolist.id] = []
      })
      .addCase(todolistsActions.removeTodolist, (state, action) => {
        delete state[action.payload.id]
      })
      .addCase(todolistsActions.setTodolists, (state, action) => {
        action.payload.todolists.forEach((tl) => {
          state[tl.id] = []
        })
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state[action.payload.todolistId] = action.payload.tasks
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.todolistId]
        const index = tasks.findIndex((t) => t.id === action.payload.taskId)
        if (index !== -1) tasks.splice(index, 1)
      })
      .addCase(addTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.task.todoListId]
        tasks.unshift(action.payload.task)
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.todolistId]
        const index = tasks.findIndex((t) => t.id === action.payload.taskId)
        if (index !== -1) {
          tasks[index] = { ...tasks[index], ...action.payload.domainModel }
        }
      })
      .addCase(clearTasksAndTodolists, () => {
        return {}
      })
  },
})


// thunks

export const fetchTasks = createAppAsyncThunk<{ tasks: TaskType[], todolistId: string }, string>
  (`${slice.name}/fetchTasks`, async (todolistId, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
      dispatch(appActions.setAppStatus({ status: 'loading' }))
      const res = await todolistsAPI.getTasks(todolistId)
      const tasks = res.data.items
      dispatch(appActions.setAppStatus({ status: 'succeeded' }))
      return { tasks, todolistId }
    } catch (error) {
      handleServerNetworkError(error, dispatch)
      return rejectWithValue(null)
    }
  })


export const removeTask = createAppAsyncThunk<{
  taskId: string, todolistId: string
}, {
  taskId: string, todolistId: string
}>
  (`${slice.name}/removeTask`, async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
      const res = await todolistsAPI.deleteTask(arg.todolistId, arg.taskId)
      if (res.data.resultCode === ResultCode.success) {
        return { todolistId: arg.todolistId, taskId: arg.taskId }
      } else {
        handleServerAppError(res.data, dispatch)
        return rejectWithValue(null)
      }
    } catch (error) {
      handleServerNetworkError(error, dispatch)
      return rejectWithValue(null)
    }
  })

export const addTask = createAppAsyncThunk<{ task: TaskType }, { title: string, todolistId: string }>
  (`${slice.name}/addTask`, async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
      dispatch(appActions.setAppStatus({ status: "loading" }))
      const res = await todolistsAPI.createTask(arg.todolistId, arg.title)
      if (res.data.resultCode === ResultCode.success) {
        dispatch(appActions.setAppStatus({ status: "succeeded" }))
        const task = res.data.data.item
        return { task }
      } else {
        handleServerAppError(res.data, dispatch)
        return rejectWithValue(null)
      }
    } catch (error) {
      handleServerNetworkError(error, dispatch)
      return rejectWithValue(null)
    }
  })

export const updateTask = createAppAsyncThunk<{ taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string },
  { taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string }>
  (`${slice.name}/updateTask`, async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue, getState } = thunkAPI
    try {
      const task = getState().tasks[arg.todolistId].find((t) => t.id === arg.taskId)
      if (!task) {
        console.warn("task not found in the state")
        return rejectWithValue(null)
      }
      const apiModel: UpdateTaskModelType = {
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        title: task.title,
        status: task.status,
        ...arg.domainModel,
      }
      const res = await todolistsAPI.updateTask(arg.todolistId, arg.taskId, apiModel)
      if (res.data.resultCode === ResultCode.success) {
        return arg
      }
      else {
        handleServerAppError(res.data, dispatch)
        return rejectWithValue(null)
      }
    } catch (error) {
      handleServerNetworkError(error, dispatch)
      return rejectWithValue(null)
    }
  })

// types
export type UpdateDomainTaskModelType = {
  title?: string
  description?: string
  status?: TaskStatuses
  priority?: TaskPriorities
  startDate?: string
  deadline?: string
}
export type TasksStateType = {
  [key: string]: Array<TaskType>
}

export const tasksReducer = slice.reducer
export const tasksActions = slice.actions
export const tasksThunks = { fetchTasks, removeTask, addTask, updateTask }