import React, { useEffect } from 'react';
import { auth } from './bdconection';

export default function Usuario() {

    useEffect(() => {
        // Agrega la clase específica para la página 2 al body
        document.body.classList.add('body-usuario');

        // Limpia la clase al desmontar el componente
        return () => {
            document.body.classList.remove('body-usuario');
        };
    }, [])

    return (
        <>
            <h1 className="usuarioh1" align="center">Tu información</h1>
            <form className="formusuario">
                <label for="nombreUsuario"><span className="textoLabelUsuario">Nombre usuario</span></label>
                <input type="text" id="nombreUsuario" name="nombreUsuario" />
                <label for="email"><span className="textoLabelUsuario">E-mail</span></label>
                <input type="text" id="email" name="email" />
            </form>
        </>
    );
};