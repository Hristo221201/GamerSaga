import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'

import { useauth } from "../utils/authprovider";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from 'react';

import { auth } from './bdconection';

export default function Login() {
  useEffect(() => {
      // Agrega la clase específica para la página 2 al body
      document.body.classList.add('body-login');

      // Limpia la clase al desmontar el componente
      return () => {
          document.body.classList.remove('body-login');
      };
  }, [])


    /* Funciones */
    function logIn() {
        var div1=document.getElementById('login-button');
        var div2=document.getElementById('container');
        
        div1.style.display='none';
        div2.style.display='block';
      }
      
      function botonLogin() {
        var div1=document.getElementById('login-button');
        var div2=document.getElementById('container');
        
        div1.style.display='block';
        div2.style.display='none';
      }
      
      function contraseñaOlvidada() {
        var div1=document.getElementById('forgotten-container');
        var div2=document.getElementById('container');
        
        div1.style.display='block';
        div2.style.display='none';
      }
      
      function loginBoton() {
        var div1=document.getElementById('forgotten-container');
        var div2=document.getElementById('login-button');
        
        div1.style.display='none';
        div2.style.display='block';
      }
      
      function registro() {
        var div1=document.getElementById('registro');
        var div2=document.getElementById('container');
        
        div1.style.display='block';
        div2.style.display='none';
      }
      
      function loginBoton2() {
        var div1=document.getElementById('registro');
        var div2=document.getElementById('login-button');
        
        div1.style.display='none';
        div2.style.display='block';
      }
      
      // Validar inicio sesion
      function validarEmail(valor) {
        //Utiliza una expresión regular para verificar si el valor es un correo electrónico válido
        const regexCorreoElectronico = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regexCorreoElectronico.test(valor);
      }
      
      const goto=useNavigate();

      function validarInicioSesion() {
        const correo = document.getElementById('correoInicioSesion');
        const valorCorreo = correo.value.trim();
        const contraseña = document.getElementById('contraseñaInicioSesion').value;
      
        if(!validarEmail(valorCorreo)) {
          Swal.fire('Introduce una dirección de correo electrónico válida');
        } else if(contraseña.length < 8) {
          Swal.fire('Introduce una contraseña válida');
        } else {
          
          goto("/paginaprincipal");
          
          return contraseña && valorCorreo;
        }
        
      };
      
      // Validar registro
      async function validarRegistro() {
        const nombreUsuario = document.getElementById("nombreRegistro").value;
        const correo = document.getElementById('emailRegistro');
        const valorCorreo = correo.value.trim();
        const contraseña = document.getElementById('passRegistro').value;
        
        if (nombreUsuario === "") {
          Swal.fire('Introduce un nombre');
        } else if (!validarEmail(valorCorreo)) {
          Swal.fire('Introduce una dirección de correo electrónico válida');
        } else if (contraseña.length < 8) {
          Swal.fire('Introduce una contraseña válida');
        } else {
          try {
            // Crea el usuario en Firebase Authentication
            await auth.createUserWithEmailAndPassword(valorCorreo, contraseña);

            // Realiza una solicitud al servidor Express para crear el usuario en la base de datos
            const response = await fetch('http://localhost:8080/create', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                nombre: nombreUsuario,
                correo: valorCorreo,
                contraseña: contraseña
              }),
            });

            if (response.ok) {
              var div1 = document.getElementById('registro');
              var div2 = document.getElementById('container');
    
              div1.style.display = 'none';
              div2.style.display = 'block';

              var correoInicioSesion = document.getElementById('correoInicioSesion').value;
              var contraseñaInicioSesion = document.getElementById('contraseñaInicioSesion').value;

              correoInicioSesion = valorCorreo;
              contraseñaInicioSesion = contraseña;

            } else {
              console.error('Error al crear usuario en el servidor');
              Swal.fire('Error al crear usuario');
            }
          } catch (error) {
            console.error("Error al crear usuario:", error);
            Swal.fire('Error al crear usuario');
          }
        }
      };
      
      // Validar correo cambio de contraseña
      function validarCorreoCambioContraseña() {
        const correo = document.getElementById('emailCambioContraseña');
        const valorCorreo = correo.value.trim();
      
        if(!validarEmail(valorCorreo)) {
          Swal.fire('Introduce una dirección de correo electrónico válida');
          //alert('Introduce una dirección de correo electrónico válida');
        } else {
          var enlaceBotonContraseñaNueva=document.getElementById("botonContraseñaNueva");
          enlaceBotonContraseñaNueva.target="_blank";
          enlaceBotonContraseñaNueva.href="mailto:hsg2001@hotmail.com";
        }
      };


    return(
        <>
            <div id="login-button">
                <img className="imglogin" src="https://dqcgrsy5v35b9.cloudfront.net/cruiseplanner/assets/img/icons/login-w-icon.png" onClick={logIn}></img>
            </div>
            
            <div id="container">
                <h1 className="loginh1">Iniciar Sesión</h1>
                <span className="close-btn">
                    <img className="imglogin" src="https://cdn4.iconfinder.com/data/icons/miu/22/circle_close_delete_-128.png" onClick={botonLogin}></img>
                </span>
                
                <form className="formInicioSesion">
                    <input type="text" id="correoInicioSesion" name="correo" placeholder="E-mail" />
                    <input type="password" id="contraseñaInicioSesion" name="pass" placeholder="Contraseña" />
                    <a href="#" onClick={validarInicioSesion} id="botonInicioSesion" className="botonInicioSesion aLogin">Inicio Sesión</a>
                    <div id="remember-container">
                        <span id="forgotten" onClick={contraseñaOlvidada}>¿Olvidaste tu contraseña?, Pulsa aqui y cambiala.</span>
                    </div>
                    <a href="#" id="botonRegistro" className="orange-btn aLogin" onClick={registro}>Registrate</a>
                </form>
            </div>
            


            


            <div id="forgotten-container">
                <h1 className="loginh1">Contraseña olvidada</h1>
                <span className="close-btn">
                    <img className="imglogin" src="https://cdn4.iconfinder.com/data/icons/miu/22/circle_close_delete_-128.png" onClick={loginBoton}></img>
                </span>
                
                <form>
                    <input type="email" id="emailCambioContraseña" name="emailCambioContraseña" placeholder="E-mail" />
                    <a href="#" onClick={validarCorreoCambioContraseña} id="botonContraseñaNueva" className="orange-btn aLogin">Obtener nueva contraseña</a>
                </form>
            </div>
            
            




            <div id="registro">
                <h1 className="loginh1">Registrarse</h1>
                <span className="close-btn">
                    <img className="imglogin" src="https://cdn4.iconfinder.com/data/icons/miu/22/circle_close_delete_-128.png" onClick={loginBoton2} />
                </span>
                
                <form>
                    <input type="text" id="nombreRegistro" name="nombre" placeholder="Nombre usuario" required />
                    <input type="email" id="emailRegistro" name="correo" placeholder="E-mail" required />
                    <input type="password" id="passRegistro" name="contraseña" placeholder="Contraseña" required />
                    <a href="#" className="aLogin" onClick={validarRegistro} id="botonRegistroAcceder">Acceder</a>
                </form>
            </div>
        </>
    );

}