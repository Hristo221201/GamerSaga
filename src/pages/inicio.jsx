import { useNavigate } from "react-router-dom";
import React, { useEffect } from 'react';

export default function Inicio() {

    const goto=useNavigate();

    function empezar() {
        goto("/login");
    }

    useEffect(() => {
        // Agrega la clase específica para la página 2 al body
        document.body.classList.add('body-inicio');

        // Limpia la clase al desmontar el componente
        return () => {
            document.body.classList.remove('body-inicio');
        };
    }, [])

    return (
            <div className="caja">
                <button className="botonInicio" onClick={empezar}>
                    Empecemos!!!
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
    );
};