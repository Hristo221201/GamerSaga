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


  // Nombre -> pokemon.name     Imagen -> pokemon.back_default      Altura -> pokemon.height        Tipo -> pokemon.types['name'] (hacer bucle q recorra el array types)

  return (
    <div className='divPokemonAPI'>
      <div>
        {pokemonList.map((pokemon) => (
            <img src={pokemon.back_default}>{pokemon.back_default}</img>,
            <p key={pokemon.name}>{pokemon.name}</p>
        ))}
      </div>
    </div>
  );
};