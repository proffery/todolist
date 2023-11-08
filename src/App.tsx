import { useState } from 'react';
import { TaskType, Todolist } from './Todolist';
import { v1 } from 'uuid';
import './App.css';

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
        {id: todoListID1, title: 'What to learn', filter: 'all'},
        {id: todoListID2, title: 'What to buy', filter: 'completed'},
    ])
    const [tasks, setTasks] = useState<TasksType>({
        [todoListID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            
        ],
        [todoListID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })

    const removeTodoList = (todoListID: string) => {
        setTodoLists(todoLists.filter(list => list.id !== todoListID))
        delete tasks[todoListID]        
    }

    const removeTask = (todoListID: string, taskID: string) => {
        setTasks({...tasks, [todoListID]:tasks[todoListID].filter(task => task.id !== taskID)})
    }

    const addTask = (todoListID:string ,taskTitle: string) => {
        const newTask = {
            id: v1(),
            title: taskTitle,
            isDone: false
        }
        setTasks({...tasks, [todoListID]:[...tasks[todoListID], newTask]})
    }

    const changeStatus = (todoListID: string, taskId: string, newStatus: boolean) => {
        setTasks({...tasks, [todoListID]:[...tasks[todoListID].map(task => task.id === taskId ? {...task, isDone:newStatus} : task)]})
    }

    const setFilter = (todoListID: string, value: TaskFilterValueType) => {
        setTodoLists(todoLists.map(list => list.id === todoListID ? {...list, filter: value} : list))
    }

    return (
        <div className="App">
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
                        changeStatus={changeStatus}
                        removeTodoList={removeTodoList}
                    />
                )
            })}

        </div>
    );
}

export default App;
