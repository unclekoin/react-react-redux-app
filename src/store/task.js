import { createSlice } from '@reduxjs/toolkit';
import todosService from '../services/todos.service';
import { setError } from './errors';

const initialState = { entities: [], isLoading: true };

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    received(state, action) {
      state.entities = action.payload;
      state.isLoading = false;
    },
    update(state, action) {
      const elementIndex = state.entities.findIndex(
        (item) => item.id === action.payload.id
      );
      state.entities[elementIndex] = { ...state.entities[elementIndex], ...action.payload };
    },
    remove(state, action) {
      state.entities = state.entities.filter((task) => task.id !== action.payload.id);
    },
    taskRequested(state) {
      state.isLoading = true;
    },
    taskRequestFailed(state, action) {
      state.isLoading = false;
    }
  },
});

const { actions, reducer: taskReducer } = taskSlice;
const { update, remove, received, taskRequested, taskRequestFailed } = actions;

export const loadTasks = () => async (dispatch) => {
  dispatch(taskRequested());
  try {
    const data = await todosService.fetch();
    dispatch(received(data));
  } catch (error) {
    dispatch(taskRequestFailed(error.message));
    dispatch(setError(error.message))
  }
}

export const completeTask = (id) => (dispatch, getState) => {
  dispatch(update({ id, completed: true }));
}

export function titleChanged(id) {
  return update({ id, title: `New title for ${id}` });
}

export function taskDeleted(id) {
  return remove({ id });
}

export const getTasks = () => (state) => state.task.entities;
export const getTasksLoadingStatus = () => (state) => state.task.isLoading;

  export default taskReducer;
