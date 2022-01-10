import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { initiateStore } from './store/store';
import * as actions from './store/actions';

const store = initiateStore();

const App = () => {
  const [state, setState] = useState(store.getState());
  console.log('render:', store.getState());

  useEffect(() => {
    store.subscribe(() => setState(store.getState()));
  }, []);

  const completeTask = (taskId) => {
    store.dispatch(actions.taskCompleted(taskId));
  };

  const changeTitle = (taskId) => {
    store.dispatch(actions.titleChanged(taskId));
  };

  const deleteTask = (taskId) => {
    store.dispatch(actions.taskDeleted(taskId));
  }

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
            <button onClick={() => deleteTask(item.id)}>Delete</button>
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
