import React, { useState } from 'react';
import './estilos/Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';




export default function Indice() {
  
  return(
    <div class="contenedor_botones">
        <a href="/Categorias"><button type="button" class="btn btn-primary">Ir a CRUD de Categorias</button></a>
        <a href="/Productos"><button type="button" class="btn btn-primary">Ir a CRUD de Productos</button></a>
        <a href="/Usuarios"><button type="button" class="btn btn-primary">Ir a CRUD de Usuarios del backoffice</button></a> 
    </div>  
    
  );
}

