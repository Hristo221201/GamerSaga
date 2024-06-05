import React, { useEffect, useState } from 'react';
import { User, actualUser } from './bdconection.js';

import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'

import { sendEmailListaPokeFavs } from './emailConfig';
import Modal from 'react-modal';

// Configura el elemento root para el modal
Modal.setAppElement('#root');

export default function PokemonsFavoritos() {
    useEffect(() => {
        // Agrega la clase específica para la página 2 al body
        document.body.classList.add('body-pokemonFavoritos');

        // Limpia la clase al desmontar el componente
        return () => {
            document.body.classList.remove('body-pokemonFavoritos');
        };
    }, [])


    const [userPokeFavoritos, setUserPokeFavoritos] = useState([]);

    useEffect(() => {
        async function obtenerFavoritos() {
            try {
                // Obtenemos el nombre del usuario que ha iniciado sesión
                const docUsuarioActual = await actualUser.get();

                if (docUsuarioActual.docs.length === 0) {
                    console.log("No se encontró el usuario actual.");
                    return;
                }

                const arrayDatosDocumento = docUsuarioActual.docs[0];
                const datosDocumento = arrayDatosDocumento.data();

                // Guardar los datos del Pokémon seleccionado en la base de datos
                const docPokemonFavoritos = await User.doc(datosDocumento.id).collection("Pokemon-Favoritos").get();

                if (!docPokemonFavoritos.empty) {
                    const userPokeFavoritosData = docPokemonFavoritos.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    
                    setUserPokeFavoritos(userPokeFavoritosData);
                } else {
                    console.log("No existen Pokémon favoritos para este usuario.");
                }
            } catch (error) {
                console.error('Error al obtener los Pokémon favoritos:', error);
            }
        }
        obtenerFavoritos();

        const fetchUsers = async () => {
            const usersSnapshot = await User.get();
            setUsers(usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        };

        fetchUsers();

    }, []);


    // Eliminar Pokemon Favorito
    async function eliminarPokemonFavorito(event) {
        const nombrePokemonEliminado = event.target.id;

        Swal.fire({
            title: "¿Deseas eliminar el Pokémon de tu lista de favoritos?",
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: "Sí",
            denyButtonText: "No"
        }).then(async (result) => {
            if (result.isConfirmed) {
                Swal.fire("Has eliminado el Pokémon de tu lista de Pokémon favoritos.", "", "success");

                // Eliminar el Pokémon de la base de datos
                try {
                    const docUsuarioActual = await actualUser.get();
                    if (docUsuarioActual) {
                        const arrayDatosDocumento = docUsuarioActual.docs[0];
                        const datosDocumento = arrayDatosDocumento.data();

                        const docRef = User.doc(datosDocumento.id);
                        const subcoleccionRef = docRef.collection("Pokemon-Favoritos");
                        await subcoleccionRef.doc(nombrePokemonEliminado).delete();
                    }
                } catch (error) {
                    console.error('Error al eliminar el Pokémon de la lista:', error);
                }

                // Actualizar la lista de Pokémon favoritos
                setUserPokeFavoritos(prevFavorites => prevFavorites.filter(pokemon => pokemon.id !== nombrePokemonEliminado));
            } else if (result.isDenied) {
                Swal.fire("No has eliminado el Pokémon de tu lista de Pokémon favoritos.", "", "info");
            }
        });
    }



    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const enviarEmailPokeFavs = async () => {
        if (selectedUser) {
            const userDoc = User.doc(selectedUser);
        //console.log(userDoc);
            const userData = userDoc.collection("Pokemon-Favoritos");
        //console.log(userData);
            const userCollection = userData.get();

            const pokemonsFav = (await userCollection).docs;
            let listaPokemonsFav=[];
            for(let i=0; i<pokemonsFav.length; i++) {
                listaPokemonsFav.push(pokemonsFav[i].id);
            }

            const userDocData = (await userDoc.get()).data();
        //console.log(userDocData);
            sendEmailListaPokeFavs(userDocData.correo, listaPokemonsFav);
            setIsModalOpen(false);
        }
    };


    return(
        <>
            <div className='divTituloPokemonFavs'>
                <h1 align="center">Pokémon Favoritos</h1>
                <div className='infoPokeFavsEntreLineas' id="infoPokeFavsEntreLineas">

                    {userPokeFavoritos.map(pokemon => (
                        <div key={pokemon.id}>
                            <h2 id="nombrePokemon">{pokemon.id}</h2>
                            <img id="imagenPokemon" src={pokemon.Imagen} style={{float: 'left'}} alt={pokemon.id} />
                            <p id="tiposPokemon">Tipos: {pokemon.Tipos}</p>
                            <p id="habilidadesPokemon">Habilidades: {pokemon.Habilidades}</p>
                            <img src="/ImagenesYvideos/papelera.png" id={pokemon.id} onClick={eliminarPokemonFavorito} />
                            <br/>
                            <hr/>
                        </div>
                    ))}
                        
                </div>

                <div>
                    <button onClick={() => setIsModalOpen(true)}>Compartir Favoritos</button>
                    <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
                        <h2>Seleccionar usuario</h2>
                        <select onChange={(e) => setSelectedUser(e.target.value)} value={selectedUser}>
                            <option value="0">Seleccionar usuario</option>
                            {users.map(user => (
                                <option key={user.id} value={user.id}>{user.nombre}</option>
                            ))}
                        </select>
                        <div>
                            <button onClick={enviarEmailPokeFavs}>Enviar</button>
                            <button onClick={() => setIsModalOpen(false)}>Cancelar</button>
                        </div>
                    </Modal>
                </div>

            </div>
        </>
    );

}