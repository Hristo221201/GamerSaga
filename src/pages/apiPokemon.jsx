import React, { useState, useEffect } from 'react';

const PokemonAleatorio = () => {
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const obtenerPokemonAleatorio = async () => {
      // Número total de Pokémon en la API
      const totalPokemon = 898;  // Este número puede cambiar según la versión de la API

      // Obtener un número aleatorio entre 1 y el total de Pokémon
      const numeroPokemon = Math.floor(Math.random() * totalPokemon) + 1;

      // Construir la URL de la API con el número de Pokémon aleatorio
      const url = `https://pokeapi.co/api/v2/pokemon/${numeroPokemon}/`;

      try {
        // Realizar la solicitud a la API
        const response = await fetch(url);
        const data = await response.json();

        // Actualizar el estado con la información del Pokémon
        setPokemon({
          nombre: data.name.capitalize(),
          id: data.id,
          tipos: data.types.map(tipo => tipo.type.name.capitalize())
        });
      } catch (error) {
        console.error('Error al obtener información del Pokémon:', error);
      }
    };

    obtenerPokemonAleatorio();
  }, []); // El segundo argumento [] asegura que useEffect se ejecute solo una vez al montar el componente

  return (
    <div>
      {pokemon ? (
        <div>
          <h2>Información del Pokémon:</h2>
          <p>Nombre: {pokemon.nombre}</p>
          <p>ID: {pokemon.id}</p>
          <p>Tipos: {pokemon.tipos.join(', ')}</p>
        </div>
      ) : (
        <p>Cargando información del Pokémon...</p>
      )}
    </div>
  );
};

export default PokemonAleatorio;