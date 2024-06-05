import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { User, actualUser } from './bdconection.js';

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

export default function PokemonAleatorio({ key }) {
  useEffect(() => {
    // Agrega la clase específica para la página 2 al body
    document.body.classList.add('body-paginaPokemon');

    // Limpia la clase al desmontar el componente
    return () => {
        document.body.classList.remove('body-paginaPokemon');
    };
  }, [])


    const [pokemons, setPokemons] = useState([]);
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [pokemonHistory, setPokemonHistory] = useState([]);

    const miFuncionAsyncRef = useRef(null);
    
    useEffect(() => {
      const obtenerNumeroAleatorio = () => Math.floor(Math.random() * 1010) + 1;
      
      const obtenerPokemonAleatorio = async () => {
        const pokemonId = obtenerNumeroAleatorio();
        const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`;
  
        try {
          const response = await fetch(url);
          const data = await response.json();
  
          const name = data.name;
          const imageUrl = data.sprites.front_default;
          const types = data.types.map((type) => type.type.name);
          const abilities = data.abilities.slice(0, 4).map((ability) => ability.ability.name);
  
          return {
            nombre: name,
            imagen: imageUrl,
            tipos: types,
            habilidades: abilities,
          };
        } catch (error) {
          console.error('Error al obtener información del Pokémon:', error);
          return null;
        }
      };

      miFuncionAsyncRef.current = obtenerPokemonAleatorio;

    }, [key]);
  
    const obtener4PokemonAleatorios = async () => {
      if (miFuncionAsyncRef.current) { 
        var textoBotonPokemons = document.getElementById("botonRecargarAPI");
        textoBotonPokemons.textContent="Cambiar Pokemons";

        const nuevosPokemons = [];
        for (let i = 0; i < 4; i++) {
          const pokemon = await miFuncionAsyncRef.current();
          if (pokemon) {
            nuevosPokemons.push(pokemon);
          }
        }
        setPokemons(nuevosPokemons);
        console.log('Función asíncrona ejecutada desde otra función asíncrona');
      } else {
        console.error('La función asíncrona no está disponible todavía.');
      }
    };

    const pokemonClickado = async (pokemon) => {
      if (miFuncionAsyncRef.current) {
        // Guardar los datos del Pokémon seleccionado en el historial
        setPokemonHistory([...pokemonHistory, pokemon]);
        console.log(pokemonHistory);

        // Obtener un nuevo Pokémon aleatorio y reemplazar el seleccionado
        const nuevoPokemon = await miFuncionAsyncRef.current();
        setPokemons((prevPokemons) =>
          prevPokemons.map((prevPokemon) =>
            prevPokemon.nombre === pokemon.nombre ? nuevoPokemon : prevPokemon
          )
        );

        // Establecer el nuevo Pokémon como seleccionado
        setSelectedPokemon(nuevoPokemon);

        console.log('Función asíncrona ejecutada desde otra función asíncrona');







        // Guardar los datos del pokemon seleccionado en la base de datos
        const docUsuarioActual = await actualUser.get();

        if(docUsuarioActual) {
          const arrayDatosDocumento = docUsuarioActual.docs[0];
          const datosDocumento = arrayDatosDocumento.data();
          console.log(datosDocumento);
         
          try {
            const arrayUser = await User.get();
            const docsUser = arrayUser.docs;

            for(let i=0; i<=docsUser.length; i++) {
                const idDocUser = docsUser[i].id;
                console.log(idDocUser);
                if(idDocUser === datosDocumento.id) {
                  const docRef = User.doc(idDocUser);
                  const subcoleccionRef = docRef.collection("Pokemon-Favoritos");
                  const subcoleccionRefDocs = (await subcoleccionRef.get()).docs;

                  // Verificar si el Pokémon ya está en la subcolección
                  let pokemonYaEnFavoritos = false;
                  for(let j = 0; j < subcoleccionRefDocs.length; j++) {
                    if(subcoleccionRefDocs[j].id === pokemon.nombre) {
                      pokemonYaEnFavoritos = true;
                      break;
                    }
                  }

                  if(pokemonYaEnFavoritos) {
                    Swal.fire("El pokemon seleccionado ya está en tu lista de pokemons favoritos");
                  } else {
                    // Agregar el nuevo documento a la subcolección
                    await subcoleccionRef.doc(pokemon.nombre).set({
                      Tipos: pokemon.tipos.join(", "),
                      Habilidades: pokemon.habilidades.join(', '),
                      Imagen: pokemon.imagen
                    });
                    Swal.fire("El pokemon seleccionado se agregó a tu lista de pokemons favoritos");
                  }
                }
            }
          } catch (error) {
            console.error('Error al agregar el documento en la subcolección:', error);
            throw error;
          }

        } else {
          console.log("El usuario no se encontro el la base de datos.");
        }

      } else {
        console.error('La función asíncrona no está disponible todavía.');
      }
    };




    const [showContainer, setShowContainer] = useState(false);
    const [query, setQuery] = useState('');
    const [pokemonsAPI, setPokemonsAPI] = useState([]);
    const [filteredPokemons, setFilteredPokemons] = useState([]);

    useEffect(() => {

      let pokemonsAleatoriosDIV = document.getElementById("pokemonsAleatorios");

      if(pokemonsAleatoriosDIV.style.display == "block") {
        pokemonsAleatoriosDIV.style.display = "none";
      } else {
        pokemonsAleatoriosDIV.style.display = "block";
      }


      if (showContainer) {  
        const fetchPokemons = async () => {
            try {
                const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10000');
                const data = await response.json();
                const pokemonDetails = await Promise.all(
                  data.results.map(async (pokemon) => {
                      const res = await fetch(pokemon.url);
                      const details = await res.json();
                      return {
                          nombre: details.name,
                          imagen: details.sprites.front_default,
                          tipos: details.types.map(typeInfo => typeInfo.type.name),
                          habilidades: details.abilities.map(abilityInfo => abilityInfo.ability.name)
                      };
                  })
                );
              setPokemonsAPI(pokemonDetails);
            } catch (error) {
                console.error('Error fetching Pokémon data:', error);
            }
        };

        fetchPokemons();
      }
    }, [showContainer]);

    useEffect(() => {
        setFilteredPokemons(
            pokemonsAPI.filter(pokemon => pokemon.nombre.toLowerCase().includes(query.toLowerCase()))
        );
    }, [query, pokemonsAPI]);



    const pokemonClickadoBusquedaSingular = async (pokemon) => {
      // Guardar los datos del pokemon seleccionado en la base de datos
      const docUsuarioActual = await actualUser.get();

      if(docUsuarioActual) {
        const arrayDatosDocumento = docUsuarioActual.docs[0];
        const datosDocumento = arrayDatosDocumento.data();
        console.log(datosDocumento);
        
        try {
          const arrayUser = await User.get();
          const docsUser = arrayUser.docs;
          for(let i=0; i<docsUser.length; i++) {
              const idDocUser = docsUser[i].id;
              console.log(idDocUser);
              if(idDocUser === datosDocumento.id) {
                const docRef = User.doc(idDocUser);
                const subcoleccionRef = docRef.collection("Pokemon-Favoritos");
                const subcoleccionRefDocs = (await subcoleccionRef.get()).docs;

                // Verificar si el Pokémon ya está en la subcolección
                let pokemonYaEnFavoritos = false;
                for(let j = 0; j < subcoleccionRefDocs.length; j++) {
                  if(subcoleccionRefDocs[j].id === pokemon.nombre) {
                    pokemonYaEnFavoritos = true;
                    break;
                  }
                }

                if(pokemonYaEnFavoritos) {
                  Swal.fire("El pokemon seleccionado ya está en tu lista de pokemons favoritos");
                } else {
                  // Agregar el nuevo documento a la subcolección
                  await subcoleccionRef.doc(pokemon.nombre).set({
                    Tipos: pokemon.tipos.join(", "),
                    Habilidades: pokemon.habilidades.join(', '),
                    Imagen: pokemon.imagen
                  });
                  Swal.fire("El pokemon seleccionado se agregó a tu lista de pokemons favoritos");
                }
              }
          }
        } catch (error) {
          console.error('Error al agregar el documento en la subcolección:', error);
          throw error;
        }

      } else {
        console.log("El usuario no se encontro el la base de datos.");
      }
    };



    return (
      <>

        <div id='pokemonsAleatorios'>      
          <p align="center" className="textoEncimaDeSidebar">Aqui tienes 4 pokemons aleatorios</p>

          <div className="divRecuadro">

            {pokemons.map((pokemon) => (

                <a href="#" className='aPokemons' id="aPokemon" key={pokemon.nombre} onClick={() => pokemonClickado(pokemon)}>
                    <div className="divEspaciado"></div>

                    <div className="nombreYfotoPokemon">
                        <h2 id="nombrePokemon">{pokemon.nombre}</h2>
                        <img src={pokemon.imagen} alt={pokemon.nombre} id="imagenPokemon" />
                    </div>

                    <div className="descripcionPokemon">
                        <p>Tipos: <span id="tiposPokemon">{pokemon.tipos.join(', ')}</span></p>
                        <p>Habilidades: <span id="habilidadesPokemon">{pokemon.habilidades.join(', ')}</span></p>
                    </div>
                </a>

            ))}

          </div>

          <br/>

          <div align="center">
            <button className="botonRecargarAPI" id="botonRecargarAPI" onClick={obtener4PokemonAleatorios}>Mostrar Pokemons</button>
          </div>
        </div>


        
        <button id='botonCambioBusqueda' onClick={() => setShowContainer(!showContainer)}>{showContainer ? 'Ocultar Buscador de Pokémon' : 'Mostrar Buscador de Pokémon'}</button>
        
        {showContainer && (
          <div id="busquedaSingular">
            <input type="text" id="pokemonInput" placeholder="Busca un Pokémon..." value={query} onChange={(e) => setQuery(e.target.value)} />
            {query && (
              <div id="pokemonList">
                {filteredPokemons.map((pokemon, index) => (
                  <a onClick={() => pokemonClickadoBusquedaSingular(pokemon)}>
                    <div key={index} className="pokemon-item">
                        <h3 id="nombrePokemon">{pokemon.nombre}</h3>
                        <img src={pokemon.imagen} id="imagenPokemon" style={{float: 'left'}} alt={pokemon.nombre} />
                        <p><strong>Tipos:</strong><span id="tiposPokemon">{pokemon.tipos.join(', ')}</span></p>
                        <p><strong>Habilidades:</strong><span id="habilidadesPokemon">{pokemon.habilidades.join(', ')}</span></p>
                        <br/>
                        <br/>
                        <hr/>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        )}
        
      </>
    );
};