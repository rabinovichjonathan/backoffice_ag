import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table, button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter, Button} from 'reactstrap';
import { render } from '@testing-library/react';
import shortid from 'shortid';

export default function Productos() {
  
  const [isOpen, setIsOpen] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [id, setId] = useState('');
  

  const categorias = [
    {id:"1", categoria: "dulces"},
    {id:"2", categoria: "salados"},
    {id:"3", categoria: "bebidas"}
  ]
  
  const [productos, setProductos] = useState(
    [
    {id:shortid.generate(), producto: "brownies", descripcion: "elaborados de forma 100% organica", precio: "150"},
    {id:shortid.generate(), producto: "Canastitas", descripcion: "sabor berenjena, con los mejores ingredientes", precio: "250"}
    ]
  );

  const [input, setInput] = useState({
      producto: '',
      precio: '',
      descripcion: ''
  });
  
  const handleChange = (e) =>{
    setInput({...input,
      [e.target.name]: e.target.value
    });     
  }
  
  const handleSubmit = (e) =>{
        e.preventDefault();
        if(!input){
            alert("ingrese un producto por favor")
        }else{
          if(modoEdicion == false){

            const nuevoProducto ={
              id: shortid.generate(),
              producto: input.producto,
              descripcion: input.descripcion,
              precio: input.precio
            }
         
            setProductos([...productos, nuevoProducto]);
        
            setInput('');
            
            ocultarModalInsertar()

          }else{
            const productosEditados = productos.map(item => item.id === id ? {id, producto: input.producto, precio: input.precio, descripcion: input.descripcion }: item)
            setProductos(productosEditados)
            
            setModoEdicion(false);
            
            setId('');
            ocultarModalEditar();
          }
        }   
  }
  
  function mostrarModalInsertar(){
    setIsOpen(true);
  }
  
  function ocultarModalInsertar(){
      setIsOpen(false);
  }
  function mostrarModalEditar(){
    setModoEdicion(true);
        
  }
  
  function ocultarModalEditar(){
    setModoEdicion(false);
  }


      const eliminarProducto = id_a_borrar => {
      
        const productosFiltrados = productos.filter(producto => producto.id !== id_a_borrar);
        setProductos(productosFiltrados);
    } 

    const editarProducto = producto => {
      setInput({
       producto: producto.producto,
       descripcion: producto.descripcion,
       precio: producto.precio
      })
      setModoEdicion(true);
      setId(producto.id);
      
      
   } 
  /*const guardarProducto = (e) => {
   
  
    const productosEditados = productos.map(item => item.id === id ? {id, nombre: producto, precio:producto, descripcion:producto }: item)


    setProductos(productosEditados);
   
    
    
    setModoEdicion(false);
    setProducto('');
    setId('');
    ocultarModalEditar();
 }    */
  return(
    <>
     
        <Container>
          <br /> 
          <Button color="success" onClick={mostrarModalInsertar}>Insertar nuevo producto</Button>
          <br /><br /> 
          <Table>
            <thead><tr><th>Id</th>
            <th>Productos</th>
            
            <th>Precio</th>
            <th>Descripcion</th>
            
            <th>Acciones</th>
            
            </tr></thead>
            <tbody>
                {productos.map((producto)=>(
                  <tr>
                    <td key={producto.id}>{producto.id}</td>
                    <td>{producto.producto}</td>
                    
                    <td>{producto.precio}</td>
                    <td>{producto.descripcion}</td>
                    
                    <td><Button color='primary' onClick={()=>{editarProducto(producto)}}>Editar</Button>{"  "}
                    <Button color='danger' onClick={()=>{eliminarProducto(producto.id)}}>Eliminar</Button></td>
                  </tr>
                ))}

              </tbody>
              <Modal isOpen = {isOpen}>
                <ModalHeader>
                  <div> 
                      <h2>Ingresa un nuevo Producto</h2>
                  </div>
                </ModalHeader>
                <ModalBody>
                  
                  <FormGroup>
                      <label>Producto:</label>
                      <input className='form-control' type='text'  name="producto" onChange={handleChange}/>
                  </FormGroup>
                  
                  <FormGroup>
                      <label>Precio:</label>
                      <input className='form-control' type='number' name='precio'  onChange={handleChange}/>
                  </FormGroup>
                  <FormGroup>
                      <label>Descripción:</label>
                      <input className='form-control' type='text' name='descripcion' onChange={handleChange}/>
                  </FormGroup>
                  
                </ModalBody>
                <ModalFooter>
                  <Button color='primary' onClick={handleSubmit}>Insertar</Button>
                  <Button color='danger' type="submit" onClick={ocultarModalInsertar}>Cancelar</Button>
                </ModalFooter>
            </Modal>   
          </Table>
            <Modal isOpen = {modoEdicion}>
            <ModalHeader>
              <div> 
                  <h2>Edita el Producto</h2>
              </div>
            </ModalHeader>
            <ModalBody>
              
                  <FormGroup>
                      <label>Producto:</label>
                      <input className='form-control' type='text' name="producto" value={input.producto}  onChange={handleChange}/>
                  </FormGroup>
                  <FormGroup>
                      <label>Precio:</label>
                      <input className='form-control' type='number' name="precio" value={input.precio} onChange={handleChange} />
                  </FormGroup>
                  <FormGroup>
                      <label>Descripción:</label>
                      <input className='form-control' type='text' name="descripcion" value={input.descripcion} onChange={handleChange}/>
                  </FormGroup>
              
            </ModalBody>
            <ModalFooter>
              <Button color='primary' onClick={handleSubmit}>Guardar</Button>
              <Button color='danger' onClick={ocultarModalEditar}>Cancelar</Button>
            </ModalFooter>
          </Modal>        
        </Container>  
     </>
  );
}
