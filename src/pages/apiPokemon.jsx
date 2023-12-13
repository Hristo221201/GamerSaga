import React, { useEffect, useState } from 'react';
import { useRef } from 'react';

export default function PokemonAleatorio({ key }) {
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
  
    const pokemonsSeleccionados = [];
    const pokemonClickado = async (pokemon) => {
      if (miFuncionAsyncRef.current) { 
        // Guardar los datos del Pokémon seleccionado en el historial
        
        pokemonsSeleccionados.push(pokemon);
        setPokemonHistory(pokemonsSeleccionados);
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
      } else {
        console.error('La función asíncrona no está disponible todavía.');
      }
    };

    return (
      <>
        <div className="divRecuadro">

          {pokemons.map((pokemon) => (

              <a href="#" className='aPokemons' id="aPokemon" key={pokemon.nombre} onClick={() => pokemonClickado(pokemon)}>
                  <div className="divEspaciado"></div>

                  <div class="nombreYfotoPokemon">
                      <h2 id="nombrePokemon">{pokemon.nombre}</h2>
                      <img src={pokemon.imagen} alt={pokemon.nombre}  id="imagenPokemon" />
                  </div>

                  <div class="descripcionPokemon">
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
      </>
    );
};

/*
const pokemonClickado = async (pokemon) => {
      if (miFuncionAsyncRef.current) { 
        // Guardar los datos del Pokémon seleccionado en el historial
        setPokemonHistory([...prevHistory, pokemon]);
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
        console.log(selectedPokemon);

        console.log('Función asíncrona ejecutada desde otra función asíncrona');
      } else {
        console.error('La función asíncrona no está disponible todavía.');
      }
    };
*/