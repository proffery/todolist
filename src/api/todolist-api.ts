import axios from "axios"

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '5bb84785-0aba-4f56-a56a-3dbda6de189f'
    },
})

export type TodolistDomainType = {
    id: string
    addedDate: string
    order: number
    title: string
}

export type TaskDomainType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: string
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type GetTasksResponseType = {
    items: TaskDomainType[]
    totalCount: number
    error: string 
}

export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}


export const todolistAPI = {
    getTodolists() {
        return instance.get<TodolistDomainType[]>('/todo-lists')
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType>(`/todo-lists/${todolistId}`,
            { title: title }
        )
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistDomainType }>>('/todo-lists',
            { title: title }
        )
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}`)
    },



    getTasks(todolistId: string) {
        return instance.get<GetTasksResponseType>(`/todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<{ item: TaskDomainType }>>(`/todo-lists/${todolistId}/tasks`,
            { title: title }
        )
    },
    updateTask(todolistId: string, taskId: string, title: string) {
        return instance.put<ResponseType<{ item: TaskDomainType }>>(`/todo-lists/${todolistId}/tasks/${taskId}`,
            { title: title }
        )
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },
}