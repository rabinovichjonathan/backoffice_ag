
import React, { useState } from 'react';
import './estilos/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table, button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter, Button} from 'reactstrap'
import { render } from '@testing-library/react';
import { Confirm } from 'semantic-ui-react';

function modalEditar({modoEdicion, setModoEdicion, mostrarModalEditar, ocultarModalEditar, isOpen}) {
    
  
   
  
    return (
     <>
     
     <Modal isOpen = {modoEdicion}>
          <ModalHeader>
             <div> 
                <h2>Ingresa una nueva Categoría</h2>
             </div>
          </ModalHeader>
          <ModalBody>
             <FormGroup>
                <label>Id:</label>
                <input className='form-control'  type='text' />
             </FormGroup>
             <FormGroup>
                <label>Categoria:</label>
                <input className='form-control' type='text' />
             </FormGroup>
             <FormGroup>

             </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color='primary' onClick=''>Guardar</Button>
            <Button color='danger' onClick={ocultarModalEditar}>Cancelar</Button>
          </ModalFooter>
        </Modal> 
        
     </>
    );
  }
  
  export default modalEditar;