import { useauth } from "../utils/authprovider";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from 'react';
/*
import { useState } from "react";
import { auth } from "./bdconection";
*/
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
        const usuario = document.getElementById('correo');
        const valorUsuario = usuario.value.trim();
        const contraseña = document.getElementById('contraseña').value;
      
        if(!validarEmail(valorUsuario)) {
          //Swal.fire('Introduce una dirección de correo electrónico válida');
          alert('Introduce una dirección de correo electrónico válida');
        } else if(contraseña.length < 8) {
          //Swal.fire('Introduce una contraseña válida');
          alert('Introduce una contraseña válida');
        } else {
          goto("/paginaprincipal");
          
          return contraseña && valorUsuario;
        }
        
      };
      
      // Validar registro
      function validarRegistro() {

          /*useEffect(() => {
            const RegistroUsuario = () => {
              const [nombreRegistro, setNombre] = useState("");
              const [emailRegistro, setEmail] = useState("");
              const [passRegistro, setPassword] = useState("");
            
              const usuarioRegistro = async () => {
                try {*/

                  const correo = document.getElementById('emailRegistro');
                  const valorCorreo = correo.value.trim();
                  const contraseña = document.getElementById('passRegistro').value;
                
                  if(!validarEmail(valorCorreo)) {
                    //Swal.fire('Introduce una dirección de correo electrónico válida');
                    alert('Introduce una dirección de correo electrónico válida');
                  } else if(contraseña.length < 8) {
                    //Swal.fire('Introduce una contraseña válida');
                    alert('Introduce una contraseña válida');
                  }

                  /*
                  // Crea el usuario en Firebase Authentication
                  const response = await auth.createUserWithEmailAndPassword(emailRegistro, passRegistro);
            
                  // Actualiza el nombre del usuario
                  await response.user.updateProfile({
                    displayName: nombreRegistro,
                  });
            
                  console.log("Usuario registrado correctamente:", response.user);
                } catch (error) {
                  console.error("Error al registrar usuario:", error.message);
                }

              };

              RegistroUsuario();
              
          }}, []);*/

          

          var div1=document.getElementById('registro');
          var div2=document.getElementById('container');
          
          div1.style.display='none';
          div2.style.display='block';
          
          return contraseña && valorCorreo;
        
      };
      
      // Validar correo cambio de contraseña
      function validarCorreoCambioContraseña() {
        const correo = document.getElementById('emailCambioContraseña');
        const valorCorreo = correo.value.trim();
      
        if(!validarEmail(valorCorreo)) {
          //Swal.fire('Introduce una dirección de correo electrónico válida');
          alert('Introduce una dirección de correo electrónico válida');
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
                    <input type="text" id="correo" name="correo" placeholder="E-mail" />
                    <input type="password" id="contraseña" name="pass" placeholder="Contraseña" />
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
                    <input type="text" id="nombreRegistro" /*value={nombreRegistro}*/ name="nombreRegistro" /*onChange={(e) => setNombre(e.target.value)}*/ placeholder="Nombre usuario" required />
                    <input type="email" id="emailRegistro" /*value={emailRegistro}*/ name="emailRegistro" /*onChange={(e) => setEmail(e.target.value)}*/ placeholder="E-mail" required />
                    <input type="password" id="passRegistro" /*value={passRegistro}*/ name="passRegistro" /*onChange={(e) => setPassword(e.target.value)}*/ placeholder="Contraseña" required />
                    <a href="#" className="aLogin" onClick={validarRegistro} id="botonRegistroAcceder">Acceder</a>
                </form>
            </div>
        </>
    );

}