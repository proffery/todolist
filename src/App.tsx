import { useState } from 'react';
import './App.css';
import { TaskType, Todolist } from './Todolist';
import { v1 } from 'uuid';

export type TaskFilterValueType = 'all' | 'active' | 'completed'

const initialTasks = [
    { id: v1(), title: "HTML&CSS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "ReactJS", isDone: false }
]

function App() {
    const [tasks, setTasks] = useState<TaskType[]>(initialTasks)
    const [filter, setFilter] = useState<TaskFilterValueType>('all')

    const removeTask = (id: string) => {
        setTasks(tasks.filter(task => task.id !== id))
    }

    const addTask = (taskTitle: string) => {
        const newTask = {
            id: v1(),
            title: taskTitle,
            isDone: false
        }
        setTasks([...tasks, newTask])
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
                addTask={addTask}
            />

        </div>
    );
}

export default App;
