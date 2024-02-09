import { TaskType } from '../Todolist';
import { AddTodolistActionType, SetTodolistsType, RemoveTodolistActionType } from './todolists-reducer';
import { TasksStateType } from '../App';
import { TaskDomainType, todolistAPI } from '../api/todolist-api';
import { Dispatch } from 'redux';

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

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS',
    todolistId: string
    taskId: string
    isDone: boolean
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    todolistId: string
    taskId: string
    title: string
}



type ActionsType = RemoveTaskActionType | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
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

            const newTask: TaskType = {
                id: action.task.id,
                title: action.title,
                isDone: action.task.completed
            }

            return { ...state, [action.task.todoListId]: [newTask, ...state[action.task.todoListId]] };
        }
        case 'CHANGE-TASK-STATUS': {
            let todolistTasks = state[action.todolistId];
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? { ...t, isDone: action.isDone } : t);

            state[action.todolistId] = newTasksArray;
            return ({ ...state });
        }
        case 'CHANGE-TASK-TITLE': {
            let todolistTasks = state[action.todolistId];
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? { ...t, title: action.title } : t);

            state[action.todolistId] = newTasksArray;
            return ({ ...state });
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
            const task = action.tasks.find(task => task.todoListId === action.todolistId)
            if (task) {
                return {
                    ...state, [task.todoListId]: action.tasks.map(task => ({
                        id: task.id,
                        title: task.title,
                        isDone: task.completed
                    }))
                }
            }
            return state
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
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
    return { type: 'CHANGE-TASK-STATUS', isDone, todolistId, taskId }
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return { type: 'CHANGE-TASK-TITLE', title, todolistId, taskId }
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