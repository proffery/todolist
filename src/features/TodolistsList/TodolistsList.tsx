import { Grid, Paper } from "@mui/material"
import { AddItemForm } from "common/components"
import { TaskStatuses } from "common/enums"
import { useActions } from 'common/hooks/useActions'
import { selectTasks } from "features/TodolistsList/tasks.selectors"
import { FilterValuesType } from "features/TodolistsList/todolists.reducer"
import { selectTodolists } from "features/TodolistsList/todolists.selectors"
import { selectIsLoggedIn } from "features/auth/auth.selectors"
import React, { useCallback, useEffect } from "react"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { Todolist } from "./Todolist/Todolist"

export const TodolistsList = () => {
  const todolists = useSelector(selectTodolists)
  const tasks = useSelector(selectTasks)
  const isLoggedIn = useSelector(selectIsLoggedIn)

  const { fetchTodolists, removeTodolist, addTodolist, changeTodolistTitle } = useActions()
  const { changeTodolistFilter } = useActions()
  const { removeTask, addTask, updateTask } = useActions()
  useEffect(() => {
    if (!isLoggedIn) {
      return
    }
    fetchTodolists()
  }, [])

  const removeTaskCB = useCallback(function (taskId: string, todolistId: string) {
   removeTask({ taskId, todolistId })
  }, [])

  const addTaskCB = useCallback(function (title: string, todolistId: string) {
    addTask({ title, todolistId })
  }, [])

  const changeStatusCB = useCallback(function (taskId: string, status: TaskStatuses, todolistId: string) {
    updateTask({ taskId, domainModel: { status }, todolistId })
  }, [])

  const changeTaskTitleCB = useCallback(function (taskId: string, title: string, todolistId: string) {
    updateTask({ taskId, domainModel: { title }, todolistId })
  }, [])

  const changeFilterCB = useCallback(function (filter: FilterValuesType, id: string) {
    changeTodolistFilter({ id, filter })
  }, [])

  const removeTodolistCB = useCallback(function (id: string) {
    removeTodolist(id)
  }, [])

  const changeTodolistTitleCB = useCallback(function (id: string, title: string) {
    changeTodolistTitle({ id, title })
  }, [])

  const addTodolistCB = useCallback(
    (title: string) => {
      addTodolist(title)
    },
    [],
  )

  if (!isLoggedIn) {
    return <Navigate to={"/login"} />
  }

  return (
    <>
      <Grid container style={{ padding: "20px" }}>
        <AddItemForm addItem={addTodolistCB} />
      </Grid>
      <Grid container spacing={3}>
        {todolists.map((tl) => {
          let allTodolistTasks = tasks[tl.id]

          return (
            <Grid item key={tl.id}>
              <Paper style={{ padding: "10px" }}>
                <Todolist
                  todolist={tl}
                  tasks={allTodolistTasks}
                  removeTask={removeTaskCB}
                  changeFilter={changeFilterCB}
                  addTask={addTaskCB}
                  changeTaskStatus={changeStatusCB}
                  removeTodolist={removeTodolistCB}
                  changeTaskTitle={changeTaskTitleCB}
                  changeTodolistTitle={changeTodolistTitleCB}
                />
              </Paper>
            </Grid>
          )
        })}
      </Grid>
    </>
  )
}
