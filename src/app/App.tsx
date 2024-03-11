import { Menu } from "@mui/icons-material"
import {
  AppBar,
  Button,
  CircularProgress,
  Container,
  IconButton,
  LinearProgress,
  Toolbar,
  Typography,
} from "@mui/material"
import { appThunks } from 'app/app.reducer'
import { selectAppStatus, selectIsInitialized } from "app/app.selectors"
import { ErrorSnackbar } from "components/ErrorSnackbar/ErrorSnackbar"
import { TodolistsList } from "features/TodolistsList/TodolistsList"
import { Login } from "features/auth/Login"
import { authThunk } from 'features/auth/auth.reducer'
import { selectIsLoggedIn } from "features/auth/auth.selectors"
import { useAppDispatch } from "hooks/useAppDispatch"
import React, { useCallback, useEffect } from "react"
import { useSelector } from "react-redux"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./App.css"

type PropsType = {
  demo?: boolean
}

function App({ demo = false }: PropsType) {
  const status = useSelector(selectAppStatus)
  const isInitialized = useSelector(selectIsInitialized)
  const isLoggedIn = useSelector(selectIsLoggedIn)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(appThunks.initializeApp())
  }, [])

  const logoutHandler = useCallback(() => {
    dispatch(authThunk.logout())
  }, [])

  if (!isInitialized) {
    return (
      <div style={{ position: "fixed", top: "30%", textAlign: "center", width: "100%" }}>
        <CircularProgress />
      </div>
    )
  }

  return (
    <BrowserRouter>
      <div className="App">
        <ErrorSnackbar />
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <Menu />
            </IconButton>
            <Typography variant="h6">News</Typography>
            {isLoggedIn && (
              <Button color="inherit" onClick={logoutHandler}>
                Log out
              </Button>
            )}
          </Toolbar>
          {status === "loading" && <LinearProgress />}
        </AppBar>
        <Container fixed>
          <Routes>
            <Route path={"/"} element={<TodolistsList demo={demo} />} />
            <Route path={"/login"} element={<Login />} />
          </Routes>
        </Container>
      </div>
    </BrowserRouter>
  )
}

export default App
