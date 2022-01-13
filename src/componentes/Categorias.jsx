import React, { useState, useEffect } from 'react';
import './estilos/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table, button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter, Button} from 'reactstrap'
import shortid from 'shortid';
import modalEditar from './modalEditar';
import { Placeholder } from 'semantic-ui-react';
import Productos from './Productos';
import http from "../http-common";










 function Categorias() {
   
  const [isOpen, setIsOpen] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [id, setId] = useState('');
 // const [categoria, setCategoria] = useState('');
  
  const [categorias, setCategorias] = useState([]);
   /* {categoria_id:shortid.generate(), categoria: "salados" },
  {categoria_id:shortid.generate(), categoria: "dulces" }*/

  
    
/*      useEffect(() => {
        traerCategorias();
    }, [])
*/
 const traerCategorias = async () => {
    const response = await http.get("/categorias");
    
    setCategorias(response.data);
    
    
  }

  useEffect(() => {
    traerCategorias();
  },[]);

  const [input, setInput] = useState({
    categoria:''
  });
      const handleChange = (e) =>{
          setInput({...input,
            [e.target.name]: e.target.value
          });
        
      }
    const handleSubmit = (e) =>{
        e.preventDefault();
        if(!input.categoria){
            alert("ingrese una categoria por favor")
        }else{
          if(modoEdicion == false){
            const nuevaCategoria = { 
              //categoria_id: shortid.generate(),
              categoria: input.categoria
            }
            
            http.post("/categorias", nuevaCategoria)
            .then(res => {
              setInput({
                categoria:''
              });
              ocultarModalInsertar()
              traerCategorias(); 
            })
            .catch(err => {
              if(err.response.status == 409){
                alert("La categoria a ingresar ya existe. Intente con otro tipo de categoría")

              }else{
                alert("ocurrió un error")
              }
             // console.log(err.response.status);
             

              
            });

            
                       
          }else{
              //const guardarCategoriaEditada = async (e) =>{
                 
                const categoriaAeditar = {
                    
                    categoria: input.categoria
                }
                
                 http.put(`/categorias/${id}`, categoriaAeditar)
                 .then(res => {
                  setInput({
                    categoria:''
                  });
                  setModoEdicion(false);
            
                  setId('');
                  ocultarModalEditar();
                  traerCategorias();
                })
                .catch(err => {
                  if(err.response.status == 409){
                    alert("La categoria a ingresar ya existe. Intente con otro tipo de categoría")
    
                  }else{
                    alert("ocurrió un error")
                  }
                 // console.log(err.response.status);
                 
    
                  
                });
                
              
              
              
             // }
             
          }
        } 
      }  
      
     /* const eliminarCategoria = id => {
      
          const categoriasFiltradas = categorias.filter(categoria => categoria.categoria_id !== id);
          const categoriaAborrar = categorias.filter(categoria => categoria.categoria_id === id);
          console.log(categoriaAborrar.categoria);

          
           http.delete(`/categorias/${categoriaAborrar.categoria_id}`);
          setCategorias(categoriasFiltradas);
         
      } */
      const eliminarCategoria = async (id) => {
        
        //const categoriasFiltradas = categorias.filter(categoria => categoria.categoria_id !== id);
       
        await http.delete(`/categorias/${id}`);
        traerCategorias();
        
      }
      

      const editarCategoria = categoria => {
        setInput({
          categoria: categoria.categoria
        })
         
        setModoEdicion(true);
        setId(categoria.categoria_id);
        
     } 
     /*const guardarCategoria = (e) => {
      /*e.preventDefault()
      if(!categoria){
          alert("ingrese una categoría por favor")
          return;
      } 
      */
    /*  const categoriasEditadas = categorias.map(item => item.id === id ? {id, categoria: categoria}: item)
      setCategorias(categoriasEditadas);
     
      
    
      setModoEdicion(false);
      setCategoria('');
      setId('');
      ocultarModalEditar();*/
   //} 


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
  
    return (
     <>
      
        <Container>
          <br /> 
          <Button color="success" onClick={mostrarModalInsertar}>Insertar nueva categoría de producto</Button>
          <br /><br /> 
          <Table>
            <thead><tr><th>Id</th>
            <th>Categorias</th>
            <th>Acciones</th>
            
            </tr></thead>
           
              <tbody>
                {categorias.map((categoria)=>(
                  <tr key={categoria.categoria_id}>
                    <td>{categoria.categoria_id}</td>
                    <td>{categoria.categoria}</td>
                    
                    <td><Button color='primary' onClick={() => { editarCategoria(categoria) }}>Editar</Button>{"  "}
                    <Button color='danger' onClick={() => { eliminarCategoria(categoria.categoria_id) }}>Eliminar</Button></td>
                  </tr>
                ))}

              </tbody>
              
          
          </Table>

        </Container>
        <Modal isOpen = {isOpen}>
          <ModalHeader>
             <div> 
                {
                
               modoEdicion===true ? <h2>modificar Categoría</h2> : <h2>Ingresa una nueva Categoría</h2>
                }
             </div>
          </ModalHeader>
          <ModalBody>
             <FormGroup>
               {/*  <label>Id:</label>*/}
                
             </FormGroup>
             <FormGroup>
               <label>Categoria:</label>
                <input className='form-control' type='text' name="categoria" value={input.categoria} onChange={handleChange} />
             </FormGroup>
             <FormGroup>

             </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color='primary' onClick={handleSubmit}>Insertar</Button>
            <Button color='danger' onClick={ocultarModalInsertar}>Cancelar</Button>
          </ModalFooter>
        </Modal>
        {/*}
        <modalEditar 
          isOpen = {isOpen}
          modoEdicion={modoEdicion}
          setModoEdicion={setModoEdicion}
          mostrarModalEditar = {mostrarModalEditar}
          ocultarModalEditar = {ocultarModalEditar}
          
        
              />*/}
       <Modal isOpen = {modoEdicion}>
          <ModalHeader>
             <div> 
                <h2>Modifica la Categoría</h2>
             </div>
          </ModalHeader>
          <ModalBody>
             
             <FormGroup onSubmit={handleSubmit}>
                <label>Categoria:</label>
                <input className='form-control' type='text' name="categoria" value={input.categoria} onChange={handleChange}/>
                
             </FormGroup>
            
          </ModalBody>
          <ModalFooter>
            <Button color='primary' onClick={handleSubmit}>Guardar</Button>
            <Button color='danger' onClick={ocultarModalEditar}>Cancelar</Button>
          </ModalFooter>
        </Modal>
      

       
     </>
    )
  
  }  

export default Categorias;