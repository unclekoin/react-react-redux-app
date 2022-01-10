import { taskUpdated, taskDeleted } from "./actionTypes";

export function taskReducer(state = [], action) {
  switch (action.type) {
    case taskUpdated: {
      const newState = [...state];
      const elementIndex = newState.findIndex(
        (item) => item.id === action.payload.id
      );
      newState[elementIndex] = { ...newState[elementIndex], ...action.payload }
      return newState;
    }
    case taskDeleted: {
      return [...state].filter((task) => task.id !== action.payload.id);
      }
    default:
      return state;
  }
}