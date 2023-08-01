import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Todo } from './Pages/Todo';
import { Route, Routes } from 'react-router-dom';
import { Register } from './Pages/Register';
import { Login } from './Pages/Login';

function App() {
  return (
    // <Todo />
    <>
      <Routes>
        <Route path='/' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/todos' element={<Todo />} />
      </Routes>
    </>
  );
}

export default App;
