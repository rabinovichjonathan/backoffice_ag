
import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Categorias from './componentes/Categorias';
import Login from './componentes/Login';
import Indice from './componentes/Indice';
import Productos from './componentes/Productos';
import Usuarios from './componentes/Usuarios';
import useToken from './useToken';



function App() {
  const { token, setToken } = useToken();

  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
    <div className="wrapper">
      <div class="contenedor_logo_titulo">
        <a href ="/"><img src="./logo_antojo_gambeta.jpeg"></img></a>
        <h1>Antojo y Gambeta BackOffice (administrador de contenidos)</h1>
      </div>  
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Indice />} />
          <Route path="/Categorias" element={<Categorias />} />    
            
          
          <Route path="/Productos" element={<Productos />} />
          <Route path="/Usuarios" element={<Usuarios />} />
           
          
        </Routes>
      </BrowserRouter>
  </div>
  );
}

export default App;