import { createAction } from '@reduxjs/toolkit';
const update = createAction('task/updated');
const remove = createAction('task/removed');

export function taskCompleted(id) {
  return update({ id, completed: true });
}

export function titleChanged(id) {
  return update({ id, title: `New title for ${id}` });
}

export function taskDeleted(id) {
  return remove({ id });
}

function taskReducer(state = [], action) {
  switch (action.type) {
    case update.type: {
      const newState = [...state];
      const elementIndex = newState.findIndex(
        (item) => item.id === action.payload.id
      );
      newState[elementIndex] = { ...newState[elementIndex], ...action.payload };
      return newState;
    }
    case remove.type: {
      return [...state].filter((task) => task.id !== action.payload.id);
    }
    default:
      return state;
  }
}

export default taskReducer;
