import { createContext, Context } from 'react';
import BaseController from './core/controllers/BaseController';
import {
  TodoListStoreType,
  TodoEditStoreType,
  TodoSearchParamsStoreType,
} from './pages/todos/stores';
import BaseListStore from './core/stores/BaseListStore';
import BaseEditStore from './core/stores/BaseEditStore';
import SearchParamsStore from './core/stores/SearchParamsStore';
import { createTodoAPI } from './pages/todos/api';
import wrapFeature from './core/wrapFeature';
import { IUserModel } from './pages/users/stores';

export interface IStoresContextValue {
  todoListStore: TodoListStoreType;
  todoEditStore: TodoEditStoreType;
  todoSearchParamsStore: TodoSearchParamsStoreType;
  userListStore: BaseListStore<IUserModel>;
  userEditStore: BaseEditStore<IUserModel>;
}

export interface IControllersContextValue {
  todoController: BaseController;
  userController: BaseController;
}

const StoresContext = createContext<IStoresContextValue | null>(
  null,
) as Context<IStoresContextValue>;
const ControllersContext = createContext<IControllersContextValue | null>(
  null,
) as Context<IControllersContextValue>;

export { StoresContext, ControllersContext };

enum ApiUrls {
  Todos = '/todos',
  Users = '/users',
}

export function initContextsValues() {
  const usersFeature = wrapFeature(ApiUrls.Users);

  const stores: IStoresContextValue = {
    todoListStore: new BaseListStore(),
    todoEditStore: new BaseEditStore(),
    todoSearchParamsStore: new SearchParamsStore(),
    userListStore: usersFeature.listStore,
    userEditStore: usersFeature.editStore,
  };

  const controllers: IControllersContextValue = {
    todoController: new BaseController(
      stores.todoListStore,
      stores.todoEditStore,
      stores.todoSearchParamsStore,
      createTodoAPI(ApiUrls.Todos),
    ),
    userController: usersFeature.controller,
  };

  return {
    stores,
    controllers,
  };
}
