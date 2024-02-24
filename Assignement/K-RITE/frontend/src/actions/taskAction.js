import axios from "axios";
import {
  ALL_TASK_REQUEST,
  ALL_TASK_SUCCESS,
  ALL_TASK_FAIL,
  TASK_DETAILS_REQUEST,
  TASK_DETAILS_SUCCESS,
  TASK_DETAILS_FAIL,
  CLEAR_ERRORS,
  CREATE_TASK_REQUEST,
  CREATE_TASK_SUCCESS,
  UPDATE_TASK_REQUEST,
  UPDATE_TASK_SUCCESS,
  UPDATE_TASK_FAIL,
  CREATE_TASK_FAIL,
} from "../constants/taskConstants";

export const getTasks =
  (keyword = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_TASK_REQUEST });

      let link = `/api/v1/tasks?keyword=${keyword}`;

      const { data } = await axios.get(link);

      dispatch({
        type: ALL_TASK_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_TASK_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};

export const getTaskDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: TASK_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/task/${id}`);

    dispatch({
      type: TASK_DETAILS_SUCCESS,
      payload: data.task,
    });
  } catch (error) {
    dispatch({
      type: TASK_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const createTask = (taskData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_TASK_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post("/api/v1/task/new", taskData, config);

    dispatch({
      type: CREATE_TASK_SUCCESS,
      payload: {
        task: data.task,
      },
    });
  } catch (error) {
    dispatch({
      type: CREATE_TASK_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateTask = (id, updatedTaskData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_TASK_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `/api/v1/task/${id}`,
      updatedTaskData,
      config
    );

    dispatch({
      type: UPDATE_TASK_SUCCESS,
      payload: {
        updatedTask: data.updatedTask,
      },
    });
  } catch (error) {
    dispatch({
      type: UPDATE_TASK_FAIL,
      payload: error.response.data.message,
    });
  }
};
