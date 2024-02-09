import { v1 } from "uuid"
import { TasksStateType } from "../App"
import { AddTodolistActionType, RemoveTodolistActionType } from "./todolists-reducer"

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    todoListID: string
    taskId: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK'
    todoListID: string
    title: string
}

export type ChangeTaskActionType = {
    type: 'CHANGE-TASK-STATUS'
    todoListID: string
    taskId: string
    taskStatus: boolean
}

export type ChangeTaskTitleType = {
    type: 'CHANGE-TASK-TITLE'
    todoListID: string
    taskId: string
    taskTitle: string
}


type ActionsType = RemoveTaskActionType | AddTaskActionType |
    ChangeTaskActionType | ChangeTaskTitleType | AddTodolistActionType | RemoveTodolistActionType

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todoListID]: state[action.todoListID]
                    .filter(task => task.id !== action.taskId)
            }
        case 'ADD-TASK':
            const newTask = {
                id: v1(),
                title: action.title,
                isDone: false
            }
            return {
                ...state,
                [action.todoListID]: [newTask, ...state[action.todoListID]]
            }
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.todoListID]: state[action.todoListID]
                    .map(task => task.id === action.taskId ? { ...task, isDone: action.taskStatus } : task)
            }
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.todoListID]: state[action.todoListID]
                    .map(task => task.id === action.taskId ? { ...task, title: action.taskTitle } : task)
            }

        case "ADD-TODOLIST":
            return {
                ...state, [action.newTodoListID]: []
            }
        case "REMOVE-TODOLIST": {
            const stateCopy = { ...state }
            delete stateCopy[action.id]
            return stateCopy
        }
        default:
            return state
    }
}

export const removeTaskAC = (todoListID: string, taskId: string) => {
    return { type: 'REMOVE-TASK', todoListID, taskId } as const
}
export const addTaskAC = (title: string, todoListID: string) => {
    return { type: 'ADD-TASK', todoListID, title } as const
}
export const changeTaskStatusAC = (taskId: string, taskStatus: boolean, todoListID: string) => {
    return { type: 'CHANGE-TASK-STATUS', taskId, taskStatus, todoListID } as const
}
export const changeTaskTitleAC = (taskId: string, taskTitle: string, todoListID: string) => {
    return { type: 'CHANGE-TASK-TITLE', taskId, taskTitle, todoListID } as const
}