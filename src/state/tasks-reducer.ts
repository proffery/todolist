import { AddTodolistActionType, SetTodolistsType, RemoveTodolistActionType } from './todolists-reducer';
import { TasksStateType } from '../App';
import { TaskDomainType, TaskRequestType, ValueOf, todolistAPI } from '../api/todolist-api';
import { Dispatch } from 'redux';
import { AppRootStateType } from './store';

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    todolistId: string
    taskId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK',
    task: TaskDomainType
    title: string
}

export type ChangeTaskActionType = {
    type: 'CHANGE-TASK',
    todolistId: string
    taskId: string
    task: TaskRequestType
}

type ActionsType = RemoveTaskActionType | AddTaskActionType
    | ChangeTaskActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsType
    | ReturnType<typeof setTasksAC>

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = { ...state }
            const tasks = stateCopy[action.todolistId];
            const newTasks = tasks.filter(t => t.id !== action.taskId);
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }
        case 'ADD-TASK': {
            const newTask: TaskDomainType = {
                id: action.task.id,
                title: action.title,
                completed: action.task.completed,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: 0,
                startDate: '',
                status: 0,
                todoListId: ''
            }
            return { ...state, [action.task.todoListId]: [newTask, ...state[action.task.todoListId]] };
        }
        case 'CHANGE-TASK': {
            return {
                ...state, [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? { ...t, ...action.task } : t)
            }
        }

        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todolistId]: []
            }
        }

        case 'REMOVE-TODOLIST': {
            const copyState = { ...state };
            delete copyState[action.id];
            return copyState;
        }

        case 'SET-TODOLISTS':
            return action.todolists.reduce((acc, el) => ({ ...acc, [el.id]: [] }), {})

        case 'SET_TASKS': {

            return { ...state, [action.todolistId]: [...action.tasks] }
        }

        default:
            return state;
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return { type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId }
}

export const addTaskAC = (title: string, task: TaskDomainType): AddTaskActionType => {
    return { type: 'ADD-TASK', title, task }
}


export const changeTaskAC = (taskId: string, todolistId: string, task: TaskDomainType): ChangeTaskActionType => {
    return { type: 'CHANGE-TASK', task, todolistId, taskId }
}

export const setTasksAC = (tasks: TaskDomainType[], todolistId: string) =>
    ({ type: 'SET_TASKS', tasks, todolistId }) as const

export const setTasksTC = (todolistID: string) => (dispatch: Dispatch) =>
    todolistAPI.getTasks(todolistID).then(res => {
        dispatch(setTasksAC(res.data.items, todolistID))
    })

export const deleteTaskTC = (todolistID: string, taskId: string) => (dispatch: Dispatch) =>
    todolistAPI.deleteTask(todolistID, taskId).then(res => {
        if (res.data.resultCode === 0) {
            dispatch(removeTaskAC(taskId, todolistID))
        }
    })

export const addTaskTC = (todolistID: string, title: string) => (dispatch: Dispatch) =>
    todolistAPI.createTask(todolistID, title).then(res => {
        if (res.data.resultCode === 0) {
            dispatch(addTaskAC(title, res.data.data.item))
        }
    })

export const changeTaskTC = (todolistID: string, taskId: string, key: keyof TaskRequestType, value: ValueOf<TaskRequestType>) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const task = getState().tasks[todolistID].find(t => t.id === taskId)
        if (task) {
            const request: TaskRequestType = {
                title: task.title,
                description: task.description,
                status: task.status,
                priority: task.priority,
                startDate: task.startDate,
                deadline: task.deadline
            }
            todolistAPI.updateTask(todolistID, taskId, { ...request, [key]: value })
                .then(res => {
                    if (res.data.resultCode === 0) {
                        dispatch(changeTaskAC(taskId, todolistID, res.data.data.item))
                    }
                })
        }
        else throw Error
    }

