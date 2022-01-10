import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import * as actions from './store/actionTypes';
import { createStore } from './store/createStore';
import { taskReducer } from './store/taskReducer';

const initialState = [
  { id: 1, title: 'Task 1', completed: false },
  { id: 2, title: 'Task 2', completed: false },
]

const store = createStore(taskReducer, initialState);

const App = () => {
  const [state, setState] = useState(store.getState());
  console.log('render:', store.getState());

  useEffect(() => {
    store.subscribe(() => setState(store.getState()));
  }, []);

  const completeTask = (taskId) => {
    store.dispatch({ type: actions.taskUpdated, payload: { id: taskId, completed: true } });
  };

  const changeTitle = (taskId) => {
    store.dispatch({
      type: actions.taskUpdated,
      payload: { id: taskId, title: `New title for ${taskId}` },
    });
  };

  return (
    <>
      <h1>App</h1>
      <ul style={{ listStyle: 'none' }}>
        {state.map((item) => (
          <li key={item.id}>
            <h3>{item.title}</h3>
            <p>{`Completed: ${item.completed}`}</p>
            <button onClick={() => completeTask(item.id)}>Complete</button>
            <button onClick={() => changeTitle(item.id)}>Change</button>
            <hr />
          </li>
        ))}
      </ul>
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
