import React, { useEffect, useState } from 'react'
import { todolistAPI } from '../api/todolist-api'

export default {
    title: 'API'
}



export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolists().then((res) => {
            setState(res.data)
        })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistTitle = ' SOME TITLE'
        todolistAPI.createTodolist(todolistTitle).then((res) => {
            setState(res.data)
        })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = '00cf4feb-8041-4836-bd69-844f82d976f1'
    useEffect(() => {
        todolistAPI.deleteTodolist(todolistId).then((res) => {
            setState(res.data)
        })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = 'd4d47838-7aff-4431-947b-ecc0423cb276'
    useEffect(() => {
        todolistAPI.updateTodolist(todolistId, 'NEW TITLE').then((res) => {
            setState(res.data)
        })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = '11e86cbd-36cd-4ad9-a1f5-9868de45e6ef'
    useEffect(() => {
        todolistAPI.getTasks(todolistId).then((res) => {
            setState(res.data)
        })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = '11e86cbd-36cd-4ad9-a1f5-9868de45e6ef'
    const taskTitle = 'TASK TITLE'
    useEffect(() => {
        todolistAPI.createTask(todolistId, taskTitle).then((res) => {
            setState(res.data)
        })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
// export const UpdateTaskTitle = () => {
//     const [state, setState] = useState<any>(null)
//     const todolistId = '11e86cbd-36cd-4ad9-a1f5-9868de45e6ef'
//     const taskId = 'f09537a8-6533-4092-aad2-a2a2338c2043'
//     const taskTitle = 'NEW TITLE'
//     useEffect(() => {
//         todolistAPI.updateTask(todolistId, taskId, taskTitle).then((res) => {
//             setState(res.data)
//         })
//     }, [])
//     return <div>{JSON.stringify(state)}</div>
// }
export const DeleteTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = '11e86cbd-36cd-4ad9-a1f5-9868de45e6ef'
    const taskId = 'f09537a8-6533-4092-aad2-a2a2338c2043'
    useEffect(() => {
        todolistAPI.deleteTask(todolistId, taskId).then((res) => {
            setState(res.data)
        })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
