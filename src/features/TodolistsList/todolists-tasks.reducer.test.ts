import { TodolistType } from "api/todolists-api"
import { TasksStateType, tasksReducer } from "features/TodolistsList/tasks.reducer"
import { TodolistDomainType, todolistsReducer, todolistsThunks } from "features/TodolistsList/todolists.reducer"

test("ids should be equals", () => {
  const startTasksState: TasksStateType = {};
  const startTodolistsState: Array<TodolistDomainType> = [];

  let todolist: TodolistType = {
    title: "new todolist",
    id: "any id",
    addedDate: "",
    order: 0,
  };

  type AddTodolist = Omit<ReturnType<typeof todolistsThunks.addTodolist.fulfilled>, "meta">
  const action: AddTodolist = {
    type: todolistsThunks.addTodolist.fulfilled.type,
    payload: {
      todolist: todolist
    }
  }
  const endTasksState = tasksReducer(startTasksState, action);
  const endTodolistsState = todolistsReducer(startTodolistsState, action);

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodolists = endTodolistsState[0].id;

  expect(idFromTasks).toBe(action.payload.todolist.id);
  expect(idFromTodolists).toBe(action.payload.todolist.id);
});
