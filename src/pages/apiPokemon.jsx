import React, { useEffect, useState } from 'react';

export default function PokemonAleatorio () {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/');
        const data = await response.json();
        const randomPokemonIds = Array.from({ length: 4 }, () =>
          Math.floor(Math.random() * data.results.length)
        );

        const selectedPokemon = randomPokemonIds.map((id) => data.results[id]);

        setPokemonList(selectedPokemon);
      } catch (error) {
        console.error('Error fetching Pokemon data:', error);
      }
    };

    fetchPokemonData();
  }, []);

  return (
    <div>
      <h1>Random Pokemon List</h1>
      <ul>
        {pokemonList.map((pokemon) => (
          <li key={pokemon.name}>{pokemon.name}</li>
        ))}
      </ul>
      <a href="/result">Ver Resultado</a>
    </div>
  );
};