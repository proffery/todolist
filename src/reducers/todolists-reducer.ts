import { TaskFilterValueType, TodolistsType } from "../AppWithReducer"


type TasksReducerType = RemoveTodolistACType | SetTodolistFilterACType | AddTodolistACType | changeTodoListTitleACType

export const todolistReducer = (state: TodolistsType[], action: TasksReducerType): TodolistsType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(list => list.id !== action.payload.todoListID)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(list => list.id === action.payload.todoListID ? { ...list, filter: action.payload.filterValue } : list)
        }
        case 'ADD-TODOLIST': {
            const newTodoList: TodolistsType = {
                id: action.payload.todoListID,
                title: action.payload.title,
                filter: 'all'
            }
            return [newTodoList, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(list => list.id === action.payload.todoListID
                ? { ...list, title: action.payload.todoListTitle }
                : list
            )

        }
        default: return state
    }
}

type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todoListID: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            todoListID
        }
    } as const
}

type SetTodolistFilterACType = ReturnType<typeof setTodolistFilterAC>
export const setTodolistFilterAC = (todoListID: string, filterValue: TaskFilterValueType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            todoListID,
            filterValue
        }
    } as const
}

type AddTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (todoListID: string, title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            todoListID,
            title
        }
    } as const
}

type changeTodoListTitleACType = ReturnType<typeof changeTodoListTitleAC>
export const changeTodoListTitleAC = (todoListID: string, todoListTitle: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            todoListID,
            todoListTitle
        }
    } as const
}