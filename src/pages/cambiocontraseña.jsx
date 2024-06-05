import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'
import { actualUser } from './bdconection';
import { auth } from './bdconection';

export default function CambiarContraseña() {

    useEffect(() => {
        // Agrega la clase específica para la página 2 al body
        document.body.classList.add('body-cambiocontraseña');

        // Limpia la clase al desmontar el componente
        return () => {
            document.body.classList.remove('body-cambiocontraseña');
        };
    }, [])

    const cambiarContraseña = async () => {
        const dataUsuarioActual = (await actualUser.get()).docs[0].data();
        console.log(dataUsuarioActual);

        auth.sendPasswordResetEmail(dataUsuarioActual.correo)
        .then(() => {
            // El correo electrónico para restablecer la contraseña ha sido enviado.
            console.log("Correo electrónico enviado");
            Swal.fire("Correo electrónico enviado");
        })
        .catch((error) => {
            // Error al enviar el correo electrónico.
            console.error(error);
            Swal.fire("Correo electrónico no enviado");
        });
    };

    return (
        <>
            <div className="divCambioContraseña">
                <a onClick={cambiarContraseña} className="aCambioContraseña">Pulsame para enviar un correo de cambio de contraseña</a>
            </div>
        </>
    );
};