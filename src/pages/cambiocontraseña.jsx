import React, { useEffect } from 'react';

export default function CambiarContraseña() {

    useEffect(() => {
        // Agrega la clase específica para la página 2 al body
        document.body.classList.add('body-cambiocontraseña');

        // Limpia la clase al desmontar el componente
        return () => {
            document.body.classList.remove('body-cambiocontraseña');
        };
    }, [])

    return (
        <>
            <div className="divCambioContraseña">
                <a href="mailto:hsg2001@hotmail.com" className="aCambioContraseña">Pulsame para enviar un correo de cambio de contraseña</a>
            </div>
        </>
    );
};