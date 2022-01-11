import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import { titleChanged, taskDeleted, completeTask } from './store/task';

const store = configureStore();

const App = () => {
  const [state, setState] = useState(store.getState());

  useEffect(() => {
    store.subscribe(() => setState(store.getState()));
  }, []);

  const changeTitle = (taskId) => {
    store.dispatch(titleChanged(taskId));
  };

  const deleteTask = (taskId) => {
    store.dispatch(taskDeleted(taskId));
  }

  return (
    <>
      <h1>App</h1>
      <ul style={{ listStyle: 'none' }}>
        {state.map((item) => (
          <li key={item.id}>
            <h3>{item.title}</h3>
            <p>{`Completed: ${item.completed}`}</p>
            <button onClick={() => store.dispatch(completeTask(item.id))}>Complete</button>
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
