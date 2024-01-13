import { v1 } from "uuid"
import { TasksType } from "../AppWithReducer"

type TasksReducerType = RemoveTaskACType | AddTaskACType |
    ChangeTaskACType | ChangeTaskStatusACType | AddEmtyTaskListACType | RemoveAllTasksACType

export const tasksReducer = (state: TasksType, action: TasksReducerType): TasksType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.payload.todoListID]: state[action.payload.todoListID]
                    .filter(task => task.id !== action.payload.taskID)
            }
        }
        case 'ADD-TASK': {
            const newTask = {
                id: v1(),
                title: action.payload.taskTitle,
                isDone: false
            }
            return {
                ...state,
                [action.payload.todoListID]: [newTask, ...state[action.payload.todoListID]]
            }
        }
        case 'CHANGE-TASK-TITLE': {
            return {
                ...state,
                [action.payload.todoListID]: state[action.payload.todoListID]
                    .map(task => task.id === action.payload.taskID ? { ...task, title: action.payload.taskTitle } : task)
            }
        }
        case 'CHANGE-TASK-STATUS': {
            return {
                ...state,
                [action.payload.todoListID]: [...state[action.payload.todoListID]
                    .map(task => task.id === action.payload.taskID ? { ...task, isDone: action.payload.newStatus } : task)
                ]
            }
        }
        case 'ADD-EMPTY-TASK-LIST': {
            return { ...state, [action.payload.newTodoListID]: [] }
        }
        case 'REMOVE-ALL-TASKS': {
            delete state[action.payload.todoListID]
            return state
        }
        default: return state
    }
}

type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todoListID: string, taskID: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            todoListID,
            taskID
        }
    } as const
}

type AddTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (todoListID: string, taskTitle: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            todoListID,
            taskTitle
        }
    } as const
}

type ChangeTaskACType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (todoListID: string, taskID: string, taskTitle: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {
            todoListID,
            taskID,
            taskTitle
        }
    } as const
}

type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (todoListID: string, taskID: string, newStatus: boolean) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            todoListID,
            taskID,
            newStatus
        }
    } as const
}

type AddEmtyTaskListACType = ReturnType<typeof addEmtyTaskListAC>
export const addEmtyTaskListAC = (newTodoListID: string) => {
    return {
        type: 'ADD-EMPTY-TASK-LIST',
        payload: {
            newTodoListID
        }
    } as const
}

type RemoveAllTasksACType = ReturnType<typeof removeAllTasksAC>
export const removeAllTasksAC = (todoListID: string) => {
    return {
        type: 'REMOVE-ALL-TASKS',
        payload: {
            todoListID
        }
    } as const
}