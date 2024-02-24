import {
  ALL_TASK_REQUEST,
  ALL_TASK_SUCCESS,
  ALL_TASK_FAIL,
  TASK_DETAILS_REQUEST,
  TASK_DETAILS_SUCCESS,
  TASK_DETAILS_FAIL,
  CREATE_TASK_REQUEST,
  CREATE_TASK_SUCCESS,
  CREATE_TASK_FAIL,
  UPDATE_TASK_REQUEST,
  UPDATE_TASK_SUCCESS,
  UPDATE_TASK_FAIL,
  CLEAR_ERRORS,
} from "../constants/taskConstants";

export const tasksReducer = (state = { task: [] }, action) => {
  switch (action.type) {
    case ALL_TASK_REQUEST:
      return {
        loading: true,
        task: [],
      };

    case ALL_TASK_SUCCESS:
      return {
        loading: false,
        task: action.payload.task,
      };

    case ALL_TASK_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const taskDetailsReducer = (state = { task: {} }, action) => {
  switch (action.type) {
    case TASK_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case TASK_DETAILS_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };
    case TASK_DETAILS_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const newTask = (state = { task: [] }, action) => {
  switch (action.type) {
    case CREATE_TASK_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_TASK_SUCCESS:
      return {
        ...state,
        loading: false,
        task: [...state.task, action.payload.task],
      };
    case CREATE_TASK_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const updateTaskReducer = (state = { updatedTask: {} }, action) => {
  switch (action.type) {
    case UPDATE_TASK_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_TASK_SUCCESS:
      return {
        ...state,
        loading: false,
        updatedTask: action.payload.updatedTask,
      };
    case UPDATE_TASK_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
