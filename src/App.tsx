import './App.css';
import { useReducer } from 'react';
import { TaskType, Todolist } from './Todolist';
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';
import { ButtonAppBar } from './ButtonAppBar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import styled from 'styled-components';
import { addEmtyTaskListAC, addTaskAC, changeTaskTitleAC, changeTaskStatusAC, removeAllTasksAC, removeTaskAC, tasksReducer } from './reducers/tasks-reducer';
import { addTodolistAC, changeTodoListTitleAC, removeTodolistAC, setTodolistFilterAC, todolistReducer } from './reducers/todolists-reducer';

export type TaskFilterValueType = 'all' | 'active' | 'completed'

export type TodolistsType = {
    id: string
    title: string
    filter: TaskFilterValueType
}

export type TasksType = {
    [key: string]: TaskType[]
}

function App() {
    let todoListID1 = v1()
    let todoListID2 = v1()

    const [todoLists, dispatchTodoLists] = useReducer(todolistReducer, [
        { id: todoListID1, title: 'What to learn', filter: 'all' },
        { id: todoListID2, title: 'What to buy', filter: 'all' },
    ])
    const [tasks, dispatchTasks] = useReducer(tasksReducer, {
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
        dispatchTasks(addTaskAC(todoListID, taskTitle))
    }

    const removeTask = (todoListID: string, taskID: string) => {
        dispatchTasks(removeTaskAC(todoListID, taskID))
    }

    const changeTask = (todoListID: string, taskID: string, taskTitle: string) => {
        dispatchTasks(changeTaskTitleAC(todoListID, taskID, taskTitle))
    }

    const changeTaskStatus = (todoListID: string, taskId: string, newStatus: boolean) => {
        dispatchTasks(changeTaskStatusAC(todoListID, taskId, newStatus))
    }

    const setTodolistFilter = (todoListID: string, value: TaskFilterValueType) => {
        dispatchTodoLists(setTodolistFilterAC(todoListID, value))
    }

    const addTodoList = (title: string) => {
        const newId = v1()
        dispatchTodoLists(addTodolistAC(newId, title))
        dispatchTasks(addEmtyTaskListAC(newId))
    }

    const removeTodoList = (todoListID: string) => {
        dispatchTodoLists(removeTodolistAC(todoListID))
        dispatchTasks(removeAllTasksAC(todoListID))
    }

    const changeTodoListTitle = (todoListID: string, todoListTitle: string) => {
        dispatchTodoLists(changeTodoListTitleAC(todoListID, todoListTitle))
    }

    return (
        <div className="App">
            <ButtonAppBar />
            <Container fixed >
                <StyledGrid container>
                    <AddItemForm callback={addTodoList} />
                </StyledGrid>
                <Stack direction={'row'} flexWrap={'wrap'} gap={4}>
                    {todoLists.map(list => {
                        let filteredTasks = tasks[list.id]
                        list.filter === 'active' && (filteredTasks = tasks[list.id].filter(task => !task.isDone))
                        list.filter === 'completed' && (filteredTasks = tasks[list.id].filter(task => task.isDone))
                        return (
                            <StyledPaper key={list.id} elevation={3}>
                                <Todolist
                                    todoListID={list.id}
                                    title={list.title}
                                    tasks={filteredTasks}
                                    removeTask={removeTask}
                                    filter={list.filter}
                                    setFilter={setTodolistFilter}
                                    addTask={addTask}
                                    changeStatus={changeTaskStatus}
                                    removeTodoList={removeTodoList}
                                    changeTask={changeTask}
                                    changeTodoListTitle={changeTodoListTitle}
                                />
                            </StyledPaper>
                        )
                    })}
                </Stack>
            </Container>
        </div>
    )
}

export default App;

const StyledPaper = styled(Paper)`
    padding: 15px;
    height: fit-content;
    width: 20%;
    min-width: 230px;
`

const StyledGrid = styled(Grid)`
    padding: 30px 0 30px 0;
    & div {
        width: 100%;
    }
`
