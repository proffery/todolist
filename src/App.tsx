import { useState } from 'react';
import { TaskType, Todolist } from './Todolist';
import { v1 } from 'uuid';
import './App.css';
import { AddItemForm } from './AddItemForm';

export type TaskFilterValueType = 'all' | 'active' | 'completed'

type TodolistsType = {
    id: string
    title: string
    filter: TaskFilterValueType
}

type TasksType = {
    [key: string]: TaskType[]
}

function App() {
    let todoListID1 = v1()
    let todoListID2 = v1()

    const [todoLists, setTodoLists] = useState<TodolistsType[]>([
        { id: todoListID1, title: 'What to learn', filter: 'all' },
        { id: todoListID2, title: 'What to buy', filter: 'all' },
    ])
    const [tasks, setTasks] = useState<TasksType>({
        [todoListID1]: [
            { id: v1(), title: 'HTML&CSS', isDone: true },
            { id: v1(), title: 'JS', isDone: true },
            { id: v1(), title: 'ReactJS', isDone: false },

        ],
        [todoListID2]: [
            { id: v1(), title: 'Rest API', isDone: true },
            { id: v1(), title: 'GraphQL', isDone: false },
        ]
    })

    const addTask = (todoListID: string, taskTitle: string) => {
        const newTask = {
            id: v1(),
            title: taskTitle,
            isDone: false
        }
        setTasks({ ...tasks, [todoListID]: [...tasks[todoListID], newTask] })
    }

    const removeTask = (todoListID: string, taskID: string) => {
        setTasks({ ...tasks, [todoListID]: tasks[todoListID].filter(task => task.id !== taskID) })
    }

    const changeTask = (todoListID: string, taskID: string, taskTitle: string) => {
        setTasks({ ...tasks, [todoListID]: tasks[todoListID].map(task => task.id === taskID ? { ...task, title: taskTitle } : task) })
        console.log(
            'todoListID:' + todoListID + '\n' +
            'taskID:' + taskID + '\n' +
            'taskTitle:' + taskTitle
        )
    }

    const changeTaskStatus = (todoListID: string, taskId: string, newStatus: boolean) => {
        setTasks({ ...tasks, [todoListID]: [...tasks[todoListID].map(task => task.id === taskId ? { ...task, isDone: newStatus } : task)] })
    }

    const setFilter = (todoListID: string, value: TaskFilterValueType) => {
        setTodoLists(todoLists.map(list => list.id === todoListID ? { ...list, filter: value } : list))
    }

    const addTodoList = (title: string) => {
        const newId = v1()
        const newTodoList: TodolistsType = {
            id: newId,
            title: title,
            filter: 'all'
        }
        setTodoLists([...todoLists, newTodoList])
        setTasks({ ...tasks, [newId]: [] })
    }

    const removeTodoList = (todoListID: string) => {
        setTodoLists(todoLists.filter(list => list.id !== todoListID))
        delete tasks[todoListID]
    }

    const changeTodoListTitle = (todoListID: string, todoListTitle: string) => {
        setTodoLists(todoLists.map(list => list.id === todoListID ? { ...list, title: todoListTitle } : list))
    }

    return (
        <div className="App">
            <AddItemForm callback={addTodoList} />
            {todoLists.map(list => {
                let filteredTasks = tasks[list.id]
                list.filter === 'active' && (filteredTasks = tasks[list.id].filter(task => !task.isDone))
                list.filter === 'completed' && (filteredTasks = tasks[list.id].filter(task => task.isDone))

                return (
                    <Todolist key={list.id}
                        todoListID={list.id}
                        title={list.title}
                        tasks={filteredTasks}
                        removeTask={removeTask}
                        filter={list.filter}
                        setFilter={setFilter}
                        addTask={addTask}
                        changeStatus={changeTaskStatus}
                        removeTodoList={removeTodoList}
                        changeTask={changeTask}
                        changeTodoListTitle={changeTodoListTitle}
                    />
                )
            })}

        </div>
    );
}

export default App;
