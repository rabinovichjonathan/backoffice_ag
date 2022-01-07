import React, { useState } from 'react';
import './estilos/Login.css';
import PropTypes from 'prop-types';

async function loginUser(credentials) {
  return fetch('http://localhost:8080/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
 }

export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password
    });
    setToken(token);
  }
  return(
    <div>
         <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                  <h3>Ingreso</h3>
                  <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Correo" onChange={e => setUserName(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <input
                              type="password"
                              className="form-control"
                              placeholder="Contraseña" onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <input
                              type="submit"
                              className="btnSubmit"
                              value="Login" 
                            />
                        </div>
                  </form>
                </div>
              </div>
        </div>
      </div>  
    
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}