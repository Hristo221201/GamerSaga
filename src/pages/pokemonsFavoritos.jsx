import PokemonAleatorio from './apiPokemon';
import React, { useEffect } from 'react';

export default function PokemonsFavoritos() {
    useEffect(() => {
        // Agrega la clase específica para la página 2 al body
        document.body.classList.add('body-pokemonFavoritos');

        // Limpia la clase al desmontar el componente
        return () => {
            document.body.classList.remove('body-pokemonFavoritos');
        };
    }, [])

    const arrayPokemonsFavoritos = [];

    return(
        <>
            <h1>Pokémon Favoritos</h1>

            <PokemonsFavoritos pokemonHistory={arrayPokemonsFavoritos} />

        </>
    );

}