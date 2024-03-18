//bindActionCreator https://redux-toolkit.js.org/api/other-exports/#bindactioncreators

// import { ActionCreator, ActionCreatorsMapObject, AsyncThunk, bindActionCreators, } from '@reduxjs/toolkit';
// import { useMemo } from 'react';
// import { useAppDispatch } from 'common/hooks/useAppDispatch';

// export const useActions = <Actions extends ActionCreatorsMapObject = ActionCreatorsMapObject>
//   (actions: Actions): BoundActions<Actions> => {
//   const dispatch = useAppDispatch();

//   return useMemo(() => bindActionCreators(actions, dispatch), []);
// };

// // Types
// type BoundActions<Actions extends ActionCreatorsMapObject> = {
//   [key in keyof Actions]: Actions[key] extends AsyncThunk<any, any, any>
//     ? BoundAsyncThunk<Actions[key]>
//     : Actions[key];
// };

// type BoundAsyncThunk<Action extends ActionCreator<any>> = (
//   ...args: Parameters<Action>
// ) => ReturnType<ReturnType<Action>>;

//////////////////////////OR///////////////////////////////

// import { useMemo } from "react";
// import { ActionCreatorsMapObject, bindActionCreators } from "redux";
// import { useAppDispatch } from "common/hooks/useAppDispatch";

// export const useActions = <T extends ActionCreatorsMapObject>(actions: T) => {
//   const dispatch = useAppDispatch();

//   return useMemo(() => bindActionCreators<T, RemapActionCreators<T>>(actions, dispatch), [actions, dispatch]);
// };

// // Types
// type IsValidArg<T> = T extends object ? (keyof T extends never ? false : true) : true;
// type ActionCreatorResponse<T extends (...args: any[]) => any> = ReturnType<ReturnType<T>>;
// type ReplaceReturnType<T, TNewReturn> = T extends (...args: any[]) => infer R
//   ? IsValidArg<Extract<T, (...args: any[]) => any>> extends true
//     ? (...args: Parameters<Extract<T, (...args: any[]) => any>>) => TNewReturn
//     : () => TNewReturn
//   : never;

// type RemapActionCreators<T extends ActionCreatorsMapObject> = {
//   [K in keyof T]: ReplaceReturnType<T[K], ActionCreatorResponse<T[K]>>;
// };

//////////////////////////OR///////////////////////////////

import { useMemo } from "react";
import { ActionCreatorsMapObject, bindActionCreators } from "redux";
import { useAppDispatch } from "common/hooks/useAppDispatch";
import { tasksThunks } from "../../features/TodolistsList/tasks.reducer";
import { todolistsActions, todolistsThunks } from "../../features/TodolistsList/todolists.reducer";
import { authThunks } from "../../features/auth/auth.reducer";
import { appActions } from 'app/app.reducer'

// ❗ упаковываем actions и соответсвенно при вызове хука не нужно
// будет передавать actions
const actionsAll = { ...tasksThunks, ...todolistsThunks, ...todolistsActions, ...authThunks, ...appActions };

type AllActions = typeof actionsAll;

export const useActions = () => {
  const dispatch = useAppDispatch();

  return useMemo(
    () => bindActionCreators<AllActions, RemapActionCreators<AllActions>>(actionsAll, dispatch),
    [dispatch],
  );
};

// Types
type ReplaceReturnType<T> = T extends (...args: any[]) => any
  ? (...args: Parameters<T>) => ReturnType<ReturnType<T>>
  : () => T;

type RemapActionCreators<T extends ActionCreatorsMapObject> = {
  [K in keyof T]: ReplaceReturnType<T[K]>;
};
