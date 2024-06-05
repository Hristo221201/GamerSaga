import React, { useState, useEffect } from 'react';
import { User, actualUser } from './bdconection.js';

export default function Usuario() {
    /* BOTONES CAMBIO INFO */
    const [editMode, setEditMode] = useState(false);
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [emailUsuario, setEmailUsuario] = useState('');

    useEffect(() => {
        // Agrega la clase específica al body
        document.body.classList.add('body-usuario');

        // Limpia la clase al desmontar el componente
        return () => {
            document.body.classList.remove('body-usuario');
        };
    }, [])


    // Función para obtener los IDs de los documentos en la colección
    async function obtenerIdsDeDocumentos() {
        try {
        // Obtiene una instantánea de la colección
        const querySnapshot = await actualUser.get();
    
        // Itera sobre los documentos en la colección
        querySnapshot.forEach(doc => {
            // Accede al ID de cada documento
            const docId = doc.id;
            console.log('ID del documento:', docId);

            // Accede a los datos de cada documento
            const datos = doc.data();
            console.log('Datos del documento:', datos);

            // Llenamos los inputs con los datos
            setNombreUsuario(datos.nombre || '');
            setEmailUsuario(datos.correo || '');
            
            document.getElementById('nombreUsuarioInfo').style.color = "black";
            document.getElementById('emailUsuarioInfo').style.color = "black";

        });

        } catch (error) {
            console.error('Error al obtener IDs de documentos:', error);
        }
        
    }
    
    // Llama a la función para obtener los IDs de los documentos
    useEffect(() => {
        obtenerIdsDeDocumentos();
    }, []);


    // Función para guardar los cambios en Firebase
    async function guardarCambios() {
        const usuarioActual = await actualUser.get();
        const usuario = usuarioActual.docs[0];
        const dataUsuario = usuario.data();


        const arrayUser = await User.get();
        const docsUser = arrayUser.docs;

        for(let i=0; i<=docsUser.length; i++) {
            if(docsUser[i].id === dataUsuario.id) {
                // Actualizar datos usuario coleccion User
                User.doc(dataUsuario.id).update({
                    nombre: nombreUsuario,
                    correo: emailUsuario
                });

                // Actualizar datos coleccion actualUser
                actualUser.doc(usuario.id).update({
                    nombre: nombreUsuario,
                    correo: emailUsuario
                });


                setEditMode(false);
            }
        }
        setEditMode(false);
    };

    async function pulsarCancelar() {
        const usuarioActual = await actualUser.get();
        const usuario = usuarioActual.docs[0];
        const dataUsuario = usuario.data();

        setNombreUsuario(dataUsuario.nombre || '');
        setEmailUsuario(dataUsuario.correo || '');

        setEditMode(false);
    }

    return (
        <div>
            <h1 className="usuarioh1" align="center">Tu información</h1>
            <form className="formusuario">
                <label htmlFor="nombreUsuarioInfo"><span className="textoLabelUsuario">Nombre usuario</span></label>
                <input type="text" id="nombreUsuarioInfo" value={nombreUsuario} onChange={(e) => setNombreUsuario(e.target.value)} disabled={!editMode} /> 
                <label htmlFor="emailUsuarioInfo"><span className="textoLabelUsuario">E-mail</span></label>
                <input type="text" id="emailUsuarioInfo" value={emailUsuario} onChange={(e) => setEmailUsuario(e.target.value)} disabled={!editMode} />

                {editMode ? (
                    <>
                        <button type="button" onClick={guardarCambios}>Guardar</button>
                        <button type="button" onClick={pulsarCancelar}>Cancelar</button>
                    </>
                ) : (
                    <button type="button" onClick={() => setEditMode(true)}>Editar</button>
                )}
            </form>
        </div>
    );
};