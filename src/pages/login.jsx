import { useauth } from "../utils/authprovider";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from 'react';
import "./dbuse";
import "./bdconection";

export default function Login() {
  useEffect(() => {
      // Agrega la clase específica para la página 2 al body
      document.body.classList.add('body-login');

      // Limpia la clase al desmontar el componente
      return () => {
          document.body.classList.remove('body-login');
      };
  }, [])


    const auth=useauth();

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
        const correo = document.getElementById('emailRegistro');
        const valorCorreo = correo.value.trim();
        const contraseña = document.getElementById('passRegistro').value;
      
        if(!validarEmail(valorCorreo)) {
          //Swal.fire('Introduce una dirección de correo electrónico válida');
          alert('Introduce una dirección de correo electrónico válida');
        } else if(contraseña.length < 8) {
          //Swal.fire('Introduce una contraseña válida');
          alert('Introduce una contraseña válida');
        } else {

          const nombreRegistro = document.getElementById('nombreRegistro').value;
          const emailRegistro = document.getElementById('emailRegistro').value;
          const passRegistro = document.getElementById('passRegistro').value;

          // Registra al usuario con correo y contraseña
          firebase.auth().createUserWithEmailAndPassword(emailRegistro, passRegistro)
            .then((userCredential) => {
              // Actualiza el nombre del usuario
              return userCredential.user.updateProfile({
                displayName: nombreRegistro
              });
            })
            .then(() => {
              // Usuario registrado con éxito y nombre actualizado
              const user = firebase.auth().currentUser;
              console.log('Usuario registrado:', user);
            })
            .catch((error) => {
              // Maneja errores durante el registro
              const errorCode = error.code;
              const errorMessage = error.message;
              console.error('Error durante el registro:', errorCode, errorMessage);
            });

            alert("Usuario registrado con exito");

          var div1=document.getElementById('registro');
          var div2=document.getElementById('container');
          
          div1.style.display='none';
          div2.style.display='block';
          
          return contraseña && valorCorreo;
        }
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
                    <input type="text" name="nombreRegistro" placeholder="Nombre usuario" required />
                    <input type="email" id="emailRegistro" name="emailRegistro" placeholder="E-mail" required />
                    <input type="password" id="passRegistro" name="passRegistro" placeholder="Contraseña" required />
                    <a href="#" className="aLogin" onClick={validarRegistro} id="botonRegistroAcceder">Acceder</a>
                </form>
            </div>
        </>
    );
    
}