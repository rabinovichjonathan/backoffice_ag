
import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Categorias from './componentes/Categorias';
import Login from './componentes/Login';
import Productos from './componentes/Productos';
import useToken from './useToken';



function App() {
  const { token, setToken } = useToken();

  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
    <div className="wrapper">
      <h1>Antojo y Gambeta BackOffice</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/Categorias" element={<Categorias />} />    
            
          
          <Route path="/Productos" element={<Productos />} />
           
          
        </Routes>
      </BrowserRouter>
  </div>
  );
}

export default App;