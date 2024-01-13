import { v1 } from "uuid"
import { TasksType } from "../AppWithReducer"
import { addEmtyTaskListAC, addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeAllTasksAC, removeTaskAC, tasksReducer } from "./tasks-reducer"

let todoListID1: string
let todoListID2: string
let startState: TasksType

beforeEach(() => {
    todoListID1 = v1()
    todoListID2 = v1()
    startState = {
        [todoListID1]: [
            { id: v1(), title: 'HTML&CSS', isDone: true },
            { id: v1(), title: 'JS', isDone: true },
            { id: v1(), title: 'ReactJS', isDone: false },

        ],
        [todoListID2]: [
            { id: v1(), title: 'Rest API', isDone: true },
            { id: v1(), title: 'GraphQL', isDone: false },
        ]
    }
})

test('correct task should be added', () => {
    const newTaskTitle = 'New Title'
    const endState = tasksReducer(startState, addTaskAC(todoListID2, newTaskTitle))
    expect(endState[todoListID2].length).toBe(3)
    expect(endState[todoListID1].length).toBe(3)
    expect(endState[todoListID2][0].title).toBe(newTaskTitle)
})

test('correct task should be removed', () => {
    const removedTaskID = v1()
    const startState: TasksType = {
        [todoListID1]: [
            { id: v1(), title: 'HTML&CSS', isDone: true },
            { id: removedTaskID, title: 'JS', isDone: true },
            { id: v1(), title: 'ReactJS', isDone: false },

        ],
        [todoListID2]: [
            { id: v1(), title: 'Rest API', isDone: true },
            { id: v1(), title: 'GraphQL', isDone: false },
        ]
    }

    const endState = tasksReducer(startState, removeTaskAC(todoListID1, removedTaskID))

    expect(endState[todoListID1].length).toBe(2)
    expect(endState[todoListID1].length).toBe(2)
    expect(endState[todoListID1][1].id).not.toBe(removedTaskID)
})

test('correct task should change it\'s name', () => {
    const changeTaskID = v1()
    const newTaskName = 'New name'
    const startState: TasksType = {
        [todoListID1]: [
            { id: changeTaskID, title: 'HTML&CSS', isDone: true },
            { id: v1(), title: 'JS', isDone: true },
            { id: v1(), title: 'ReactJS', isDone: false },

        ],
        [todoListID2]: [
            { id: v1(), title: 'Rest API', isDone: true },
            { id: v1(), title: 'GraphQL', isDone: false },
        ]
    }

    const endState = tasksReducer(startState, changeTaskTitleAC(todoListID1, changeTaskID, newTaskName))

    expect(endState[todoListID1].length).toBe(3)
    expect(endState[todoListID2].length).toBe(2)
    expect(endState[todoListID1][0].title).toBe(newTaskName)
})

test('correct task should change it\'s status', () => {
    const changeTaskID = v1()

    const startState: TasksType = {
        [todoListID1]: [
            { id: v1(), title: 'HTML&CSS', isDone: true },
            { id: v1(), title: 'JS', isDone: true },
            { id: changeTaskID, title: 'ReactJS', isDone: true },

        ],
        [todoListID2]: [
            { id: v1(), title: 'Rest API', isDone: true },
            { id: v1(), title: 'GraphQL', isDone: false },
        ]
    }

    const endState = tasksReducer(startState, changeTaskStatusAC(todoListID1, changeTaskID, !startState[todoListID1][2].isDone))

    expect(endState[todoListID1].length).toBe(3)
    expect(endState[todoListID2].length).toBe(2)
    expect(endState[todoListID1][2].isDone).toBe(!startState[todoListID1][2].isDone)
})

test('empty task list should be added', () => {
    let todoListID3 = v1()
    const endState = tasksReducer(startState, addEmtyTaskListAC(todoListID3))

    expect(endState[todoListID1].length).toBe(3)
    expect(endState[todoListID2].length).toBe(2)
    expect(endState[todoListID3].length).toBe(0)
})

test('all tasks should be removed', () => {
    const endState = tasksReducer(startState, removeAllTasksAC(todoListID1))
    expect(endState[todoListID1]).toBeUndefined()
    expect(endState[todoListID2].length).toBe(2)
    expect(endState[todoListID2][1].title).toBe('GraphQL')
})