import React, { useEffect } from 'react';

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
                <label className="textoLabelUsuario" for="nombreUsuario">Nombre usuario</label>
                <input type="text" id="nombreUsuario" name="nombreUsuario" />
                <label className="textoLabelUsuario" for="email">E-mail</label>
                <input type="text" id="email" name="email" />
            </form>
        </>
    );
};