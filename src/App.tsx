import React, { useState } from 'react';
import './App.css';
import { TaskType, Todolist } from './Todolist';

export type TaskFilterValueType = 'all' | 'active' | 'completed'

const initialTasks = [
    { id: 1, title: "HTML&CSS", isDone: true },
    { id: 2, title: "JS", isDone: true },
    { id: 3, title: "ReactJS", isDone: false }
]

function App() {
    const [tasks, setTasks] = useState<TaskType[]>(initialTasks)
    const [filter, setFilter] = useState<TaskFilterValueType>('all')

    const removeTask = (id: number) => {
        setTasks(tasks.filter(task => task.id !== id))
    }
    
    let filteredTasks = tasks
    filter === 'active' && (filteredTasks = tasks.filter(task => !task.isDone))
    filter === 'completed' && (filteredTasks = tasks.filter(task => task.isDone))

    return (
        <div className="App">
            <Todolist title='What to learn' 
                tasks={filteredTasks}
                removeTask={removeTask}
                setFilter={setFilter}
            />

        </div>
    );
}

export default App;
