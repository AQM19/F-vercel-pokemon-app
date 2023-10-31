import { Layout } from '@/components/layouts'
import { NoFavourites } from '@/components/ui';
import { LocalStorage } from '@/utils';
import React from 'react'
import { useState, useEffect } from 'react';
import { Grid, Card } from '@nextui-org/react';
import { FavouritePokemons } from '@/components/pokemon/FavouritePokemons';

const FavouritesPage = () => {

    const [favouritePokemons, setFavouritePokemons] = useState<number[]>([]);

    useEffect(() => {
        setFavouritePokemons(LocalStorage.pokemons());
    }, []);

    return (
        <Layout title='Pokemons - Favoritos'>

            {
                favouritePokemons.length === 0
                    ? (<NoFavourites />)
                    : (<FavouritePokemons pokemons={favouritePokemons} />)
            }
        </Layout >
    )
};

export default FavouritesPage;
