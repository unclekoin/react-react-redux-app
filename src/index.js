import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { getError } from './store/errors';
import configureStore from './store/store';
import {
  titleChanged,
  taskDeleted,
  completeTask,
  loadTasks,
  getTasks,
  getTasksLoadingStatus,
} from './store/task';

const store = configureStore();

const App = () => {
  const state = useSelector(getTasks());
  const isLoading = useSelector(getTasksLoadingStatus());
  const error = useSelector(getError());
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTasks());
  }, []);

  const changeTitle = (taskId) => {
    dispatch(titleChanged(taskId));
  };

  const deleteTask = (taskId) => {
    dispatch(taskDeleted(taskId));
  };

  if (isLoading) return <h1>Loading...</h1>

  if (error) return <p>{error}</p>

  return (
    <>
      <h1>App</h1>
      <ul style={{ listStyle: 'none' }}>
        {state.map((item) => (
          <li key={item.id}>
            <h3>{item.title}</h3>
            <p>{`Completed: ${item.completed}`}</p>
            <button onClick={() => dispatch(completeTask(item.id))}>
              Complete
            </button>
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
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
