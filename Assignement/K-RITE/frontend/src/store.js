import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import { authReducer } from "./reducers/userReducers";
import { taskDetailsReducer, tasksReducer } from "./reducers/taskReducers";
import { createTask, updateTask } from "./actions/taskAction";

const reducer = combineReducers({
  auth: authReducer,
  tasks: tasksReducer,
  taskDetails: taskDetailsReducer,
  newTask: createTask,
  updateTask: updateTask,
});

let initialState = {};

const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
