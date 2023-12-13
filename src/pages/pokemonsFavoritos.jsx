import PokemonAleatorio from './apiPokemon.jsx';
import React, { useEffect } from 'react';

export default function PokemonsFavoritos() { // { pokemonHistory }
    useEffect(() => {
        // Agrega la clase específica para la página 2 al body
        document.body.classList.add('body-pokemonFavoritos');

        // Limpia la clase al desmontar el componente
        return () => {
            document.body.classList.remove('body-pokemonFavoritos');
        };
    }, []) // pokemonHistory

    return(
        <>
            
        </>
    );

}

/*
    <h1>Pokémon Favoritos</h1>
    {pokemonHistory.map((pokemon, index) => (
        <div key={index}>
        <p>Nombre: {pokemon.nombre}</p>
        <img src={pokemon.imagen} alt={pokemon.nombre}  id="imagenPokemon" />
        <p>Tipos: {pokemon.tipos.join(', ')}</p>
        <p>Habilidades: {pokemon.habilidades.join(', ')}</p>
        </div>
    ))
*/