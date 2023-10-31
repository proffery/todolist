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
        setTasks([newTask, ...tasks])
    }

    const changeStatus = (taskId: string, newStatus: boolean) => {
        setTasks(tasks.map((task) => task.id === taskId ? { ...task, isDone: newStatus } : task))
    }

    let filteredTasks = tasks
    filter === 'active' && (filteredTasks = tasks.filter(task => !task.isDone))
    filter === 'completed' && (filteredTasks = tasks.filter(task => task.isDone))

    return (
        <div className="App">
            <Todolist title='What to learn'
                tasks={filteredTasks}
                removeTask={removeTask}
                filter={filter}
                setFilter={setFilter}
                addTask={addTask}
                changeStatus={changeStatus}
            />

        </div>
    );
}

export default App;
