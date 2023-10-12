import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import EditQuiz from './screens/EditQuiz';

import store from './store'
import { Provider } from 'react-redux';
import HomePage from './screens/HomePage';
import DrillQuiz from './screens/DrillQuiz';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomePage />}></Route>
      <Route path='/login' element={<LoginScreen />}></Route>
      <Route path='/signup' element={<SignUpScreen />}></Route>
      <Route path='/edit' element={<EditQuiz />}></Route>
      <Route path='/quiz' element={<DrillQuiz />}></Route>
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={ router } />
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
