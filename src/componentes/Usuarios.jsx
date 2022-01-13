import React, { useState, useEffect } from 'react';
import './estilos/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table, button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter, Button} from 'reactstrap'
import shortid from 'shortid';
import modalEditar from './modalEditar';
import { Placeholder } from 'semantic-ui-react';
import Productos from './Productos';
import http from "../http-common";




function Usuarios() {
   
  const [isOpen, setIsOpen] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [id, setId] = useState('');
 // const [usuario, setUsuario] = useState('');
  
  const [usuarios, setUsuarios] = useState([]);
   /* {usuario_id:shortid.generate(), usuario: "salados" },
  {usuario_id:shortid.generate(), usuario: "dulces" }*/

  
    
/*      useEffect(() => {
        traerUsuarios();
    }, [])
*/
 const traerUsuarios = async () => {
    const response = await http.get("/usuarios");
    
    setUsuarios(response.data);
    
    
  }

  useEffect(() => {
    traerUsuarios();
  },[]);

  const [input, setInput] = useState({
    usuario:'',
    clave:''
  });
      const handleChange = (e) =>{
          setInput({...input,
            [e.target.name]: e.target.value
          });
        
      }
    const handleSubmit = (e) =>{
        e.preventDefault();
        if(!input.usuario){
            alert("ingrese un usuario por favor")
        }else{
          if(modoEdicion == false){
            const nuevaUsuario = { 
              //usuario_id: shortid.generate(),
              usuario: input.usuario,
              clave: input.clave
            }
            
            http.post("/usuarios", nuevaUsuario)
            .then(res => {
              setInput({
                usuario:'',
                clave: ''
              });
              ocultarModalInsertar()
              traerUsuarios(); 
            })
            .catch(err => {
              if(err.response.status == 409){
                alert("El usuario a ingresar ya existe. Intente con otro tipo de usuario")

              }else{
                alert("ocurrió un error")
              }
             // console.log(err.response.status);
             

              
            });

            
                       
          }else{
              //const guardarUsuarioEditada = async (e) =>{
                 
                const usuarioAeditar = {
                    
                    usuario: input.usuario,
                    clave: input.clave
                }
                
                 http.put(`/usuarios/${id}`, usuarioAeditar)
                 .then(res => {
                  setInput({
                    usuario:'',
                    clave: ''
                  });
                  setModoEdicion(false);
            
                  setId('');
                  ocultarModalEditar();
                  traerUsuarios();
                })
                .catch(err => {
                  if(err.response.status == 409){
                    alert("La usuario a ingresar ya existe. Intente con otro tipo de categoría")
    
                  }else{
                    alert("ocurrió un error")
                  }
                 // console.log(err.response.status);
                 
    
                  
                });
                
              
              
              
             // }
             
          }
        } 
      }  
      
     /* const eliminarUsuario = id => {
      
          const usuariosFiltradas = usuarios.filter(usuario => usuario.usuario_id !== id);
          const usuarioAborrar = usuarios.filter(usuario => usuario.usuario_id === id);
          console.log(usuarioAborrar.usuario);

          
           http.delete(`/usuarios/${usuarioAborrar.usuario_id}`);
          setUsuarios(usuariosFiltradas);
         
      } */
      const eliminarUsuario = async (id) => {
        
        //const usuariosFiltradas = usuarios.filter(usuario => usuario.usuario_id !== id);
       
        await http.delete(`/usuarios/${id}`);
        traerUsuarios();
        
      }
      

      const editarUsuario = usuario => {
        setInput({
          usuario: usuario.usuario,
          clave: usuario.clave
        })
         
        setModoEdicion(true);
        setId(usuario.usuario_id);
        
     } 
     /*const guardarUsuario = (e) => {
      /*e.preventDefault()
      if(!usuario){
          alert("ingrese una categoría por favor")
          return;
      } 
      */
    /*  const usuariosEditadas = usuarios.map(item => item.id === id ? {id, usuario: usuario}: item)
      setUsuarios(usuariosEditadas);
     
      
    
      setModoEdicion(false);
      setUsuario('');
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
          <Button color="success" onClick={mostrarModalInsertar}>Insertar nuevo usuario</Button>
          <br /><br /> 
          <Table>
            <thead><tr><th>Id</th>
            <th>Usuarios</th>
            <th>Acciones</th>
            
            </tr></thead>
           
              <tbody>
                {usuarios.map((usuario)=>(
                  <tr key={usuario.usuario_id}>
                    <td>{usuario.usuario_id}</td>
                    <td>{usuario.usuario}</td>
                    
                    <td><Button color='primary' onClick={() => { editarUsuario(usuario) }}>Editar</Button>{"  "}
                    <Button color='danger' onClick={() => { eliminarUsuario(usuario.usuario_id) }}>Eliminar</Button></td>
                  </tr>
                ))}

              </tbody>
              
          
          </Table>

        </Container>
        <Modal isOpen = {isOpen}>
          <ModalHeader>
             <div> 
                {
                
               modoEdicion===true ? <h2>modificar Usuario</h2> : <h2>Ingresa un nuevo usuario</h2>
                }
             </div>
          </ModalHeader>
          <ModalBody>
             <FormGroup>
               {/*  <label>Id:</label>*/}
                
             </FormGroup>
             <FormGroup>
               <label>Usuario:</label>
                <input className='form-control' type='text' name="usuario" value={input.usuario} onChange={handleChange} />
             </FormGroup>
             <FormGroup>
               <label>Clave:</label>
                <input className='form-control' type='password' name="clave" value={input.clave} onChange={handleChange} />
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
                <h2>Modifica el usuario</h2>
             </div>
          </ModalHeader>
          <ModalBody>
             
             <FormGroup onSubmit={handleSubmit}>
                <label>Usuario:</label>
                <input className='form-control' type='text' name="usuario" value={input.usuario} onChange={handleChange}/>
                
             </FormGroup>
             <FormGroup>
               <label>Clave:</label>
                <input className='form-control' type='password' name="clave" value={input.clave} onChange={handleChange} />
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

export default Usuarios;