import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table, button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter, Button} from 'reactstrap';
import { render } from '@testing-library/react';
import http from '../http-common';

export default function Productos() {
  
  const [isOpen, setIsOpen] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [id, setId] = useState('');
  

  
  
  const [categorias, setCategorias] = useState([]);
  const [productos, setProductos] = useState([]);
   /* [
    {id:shortid.generate(), producto: "brownies", descripcion: "elaborados de forma 100% organica", precio: "150"},
    {id:shortid.generate(), producto: "Canastitas", descripcion: "sabor berenjena, con los mejores ingredientes", precio: "250"}
    ]
  );*/
  const traerProductos = async () => {
    const response = await http.get("/productos");
    setProductos(response.data);
    
  }
  const traerCategorias = async () => {
    const response = await http.get("/categorias");
    
    setCategorias(response.data);
    
    
  }
  useEffect(() => {
    traerProductos();
    traerCategorias();
  },[]);

  

  

  const [input, setInput] = useState({
      producto: '',
      precio: '',
      descripcion: '',
      cantidad_unidades: '',
      foto_producto:'',
      destacado:0,
      categoria_id: 0
  });
  
  const handleChange = (e) =>{
    setInput({...input,
      [e.target.name]: e.target.value
    });    
    
    console.log(e)
  }

  const handleChangeDestacado = (e) =>{
    var destacado;
    if(input.destacado == 0){
      destacado =1;
    }else{
      destacado =0;
    }
    setInput({...input,
      [e.target.name]: destacado
    });     
  }  
  
  const handleSubmit = (e) =>{
        e.preventDefault();
        if(!input.producto){
            alert("ingrese un producto por favor")
        }else{
          if(modoEdicion == false){

            const nuevoProducto ={
              //id: shortid.generate(),
              producto: input.producto,
              descripcion: input.descripcion,
              precio: input.precio,
              cantidad_unidades: input.cantidad_unidades,
              foto_producto: input.foto_producto,
              destacado: input.destacado,
              categoria_id: input.categoria_id
            }
            console.log(input.categoria_id);
            http.post("/productos", nuevoProducto)
            .then(res => {
              setInput({
                producto:'',
                descripcion:'',
                precio:'',
                cantidad_unidades: '',
                foto_producto:'',
                destacado:0,
                
              });
              ocultarModalInsertar()
              traerProductos(); 
            })
            .catch(err => {
              if(err.response.status == 409){
                alert("El producto a ingresar ya existe. Intente con otro tipo de producto")

              }else{
                alert(err.message)
              }
            });


          }else{
            const productoAeditar = {
                    
              producto: input.producto,
              descripcion: input.descripcion,
              precio: input.precio,
              cantidad_unidades:input.cantidad_unidades,
              categoria_id: input.categoria_id,
              foto_producto: input.foto_producto,
              destacado: input.destacado
            }
          
           http.put(`/productos/${id}`, productoAeditar)
            .then(res => {
              setInput({
                producto: '',
                descripcion: '',
                precio: '',
                cantidad_unidades:'',
                foto_producto: '',
                destacado: 0
              });
              setModoEdicion(false);
        
              setId('');
              ocultarModalEditar();
              traerProductos();
            })
            .catch(err => {
              if(err.response.status == 409){
                alert("El producto a ingresar ya existe. Intente con otro tipo de producto")

              }else{
                alert("ocurrió un error")
              }  
            });
          }
        }  
  }   
  
  function mostrarModalInsertar(){
    setIsOpen(true);
    setInput({
      producto: '',
      descripcion: '',
      precio: '',
      cantidad_unidades:'',
      foto_producto: '',
      destacado: 0,
      categoria_id: categorias[0].categoria_id
    });
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


      const eliminarProducto = async (id) => {
      
        await http.delete(`/productos/${id}`);
        traerProductos();
    } 

    const editarProducto = producto => {
      const destacado = producto.destacado ? 1 : 0
      setInput({
       producto: producto.producto,
       descripcion: producto.descripcion,
       precio: producto.precio,
       cantidad_unidades: producto.cantidad_unidades,
       categoria_id: producto.categoria.categoria_id,
       foto_producto: producto.foto_producto,
       destacado: destacado
      })
      setModoEdicion(true);
      setId(producto.producto_id);
      
      
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
            <th>Cantidad de unidades</th>
            <th>Categoría</th>
            <th>Foto del producto</th>
            <th>Destacado en home</th>
            <th>Acciones</th>
            
            </tr></thead>
            <tbody>
                {productos.map((producto)=>(
                  <tr>
                    <td key={producto.producto_id}>{producto.producto_id}</td>
                    <td>{producto.producto}</td>
                    
                    <td>{producto.precio}</td>
                    <td>{producto.descripcion}</td>
                    <td>{producto.cantidad_unidades}</td>
                    <td>{producto.categoria.categoria}</td>
                    <td>{producto.foto_producto}</td>
                   
                    <td>{producto.destacado  ? "si" : "no"}</td>
                  
                    <td><Button color='primary' onClick={()=>{editarProducto(producto)}}>Editar</Button>{"  "}
                    <Button color='danger' onClick={()=>{eliminarProducto(producto.producto_id)}}>Eliminar</Button></td>
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
                      <input className='form-control' type='number' name='precio' required  onChange={handleChange}/>
                  </FormGroup>
                  <FormGroup>
                      <label>Descripción:</label>
                      <input className='form-control' type='text' name='descripcion' onChange={handleChange}/>
                  </FormGroup>
                  <FormGroup>
                        <label>Cantidad de unidades:</label>
                        <input type='number' name='cantidad_unidades' onChange={handleChange}/>
                  </FormGroup>
                  <FormGroup>
                        <label>Foto del producto:</label>
                        <input type='text' name='foto_producto' onChange={handleChange}/>
                  </FormGroup>
                  <FormGroup>
                      <label>Categoria: </label> 
                      <select name="categoria_id" value={input.categoria_id}  onChange={handleChange}>
                        {/*<option selected>Abre este menu de selección</option>*/}
                        {categorias.map((categoria)=>(
                         
                        <option value={categoria.categoria_id}>{categoria.categoria}</option>
                        ))}
                      </select>
                      
                  </FormGroup>
                  <FormGroup>
                      <label>Destacar en home:</label>
                      <input type='checkbox' name='destacado' onChange={handleChangeDestacado}/>
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
                  <FormGroup>
                        <label>Cantidad de unidades:</label>
                        <input type='number' name='cantidad_unidades' value={input.cantidad_unidades} onChange={handleChange}/>
                  </FormGroup>
                  <FormGroup>
                      <label>Categoria: </label> 
                      <select name="categoria_id" value={input.categoria_id} onChange={handleChange}>
                        {categorias.map((categoria)=>(
                        <option value={categoria.categoria_id}>{categoria.categoria}</option>
                        ))}
                      </select>
                      
                  </FormGroup>
                  <FormGroup>
                      <label>Foto del producto:</label>
                      <input  type='text' name='foto_producto' value={input.foto_producto}  onChange={handleChange}/>
                  </FormGroup>
                  <FormGroup>
                      <label>Destacar en home:</label>
                      <input type='checkbox' name='destacado' value={input.destacado} checked={input.destacado ? 'checked' : ''} onChange={handleChangeDestacado}/>
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
