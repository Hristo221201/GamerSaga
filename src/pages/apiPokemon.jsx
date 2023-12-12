import React, { useEffect, useState } from 'react';

export default function PokemonAleatorio() {
    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
      const obtenerNumeroAleatorio = () => Math.floor(Math.random() * 898) + 1;
  
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
  
      const obtener4PokemonAleatorios = async () => {
        const nuevosPokemons = [];
        for (let i = 0; i < 4; i++) {
          const pokemon = await obtenerPokemonAleatorio();
          if (pokemon) {
            nuevosPokemons.push(pokemon);
          }
        }
        setPokemons(nuevosPokemons);
      };
  
      obtener4PokemonAleatorios();
    }, []);
  
    return (
      <div id="divPokemonAPI">
        {pokemons.map((pokemon) => (
          <div>
            <h2>{pokemon.nombre}</h2>
            <img src={pokemon.imagen} alt={pokemon.nombre} />
            <p>Tipos: {pokemon.tipos.join(', ')}</p>
            <p>Habilidades: {pokemon.habilidades.join(', ')}</p>
            <hr />
          </div>
        ))}
      </div>
    );
};


// Nombre -> pokemon.name     Imagen -> pokemon.front_default      Altura -> pokemon.height        Tipo -> pokemon.types['name'] (hacer bucle q recorra el array types)