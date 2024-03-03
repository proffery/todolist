import { RequestStatusType } from 'app/app-reducer'
import { AppRootStateType } from 'app/store'
import { TasksStateType } from 'features/TodolistsList/tasksSlice'
import { TodolistDomainType } from 'features/TodolistsList/todolistsSlice'

export const selectIsLoggedIn = (state: AppRootStateType):boolean => state.auth.isLoggedIn
export const selectStatus = (state: AppRootStateType): RequestStatusType => state.app.status
export const selectIsInitialized = (state: AppRootStateType):boolean => state.app.isInitialized
export const selectError = (state: AppRootStateType): string | null => state.app.error
export const selectTodolists = (state: AppRootStateType): TodolistDomainType[] => state.todolists
export const selectTasks = (state: AppRootStateType): TasksStateType => state.tasks