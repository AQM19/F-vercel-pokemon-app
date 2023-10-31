import { GetStaticProps, GetStaticPaths, NextPage } from 'next';

import confetti from 'canvas-confetti';

import pokeApi from '@/api/pokeApi';
import { Layout } from '@/components/layouts'
import { Pokemon } from '@/interfaces/pokemon-full';
import { Button, Card, Container, Grid, Text, Image } from '@nextui-org/react';
import { useState } from 'react';
import { LocalStorage, getPokemonInfo } from '@/utils';
import { PokemonListResponse } from '@/interfaces';

interface Props {
    pokemon: Pokemon;
}

const PokemonByNamePage: NextPage<Props> = ({ pokemon }) => {

    //Mantener estado
    const [isInLocalStorage, setIsInLocalStorage] = useState(LocalStorage.existInLocalStorage(pokemon.id));

    const onToggleFavourite = () => {
        LocalStorage.toggleFavourite(pokemon.id);
        // Actualizar los cambios fisicamente para cambiar estado del botón
        setIsInLocalStorage(!isInLocalStorage);

        if (isInLocalStorage) return;

        confetti({
            zIndex: 999,
            particleCount: 100,
            spread: 160,
            angle: -100,
            origin: {
                x: 1,
                y: 0
            }
        })
    }

    return (
        <Layout title={pokemon.name}>
            <Grid.Container
                css={{ marginTop: '5px' }}
                gap={2}>
                <Grid xs={12} sm={4}>
                    <Card hoverable css={{ padding: '30px' }}>
                        <Card.Body>
                            <Card.Image
                                src={pokemon.sprites.other?.dream_world.front_default || 'no-image.png'}
                                alt={pokemon.name}
                                width="100%"
                                height={200}
                            />
                        </Card.Body>
                    </Card>
                </Grid>

                <Grid xs={12} sm={8}>
                    <Card>
                        <Card.Header css={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Text h1 transform='capitalize'>{pokemon.name}</Text>
                            <Button
                                color="gradient"
                                ghost={!isInLocalStorage}
                                onClick={onToggleFavourite}
                            >
                                {isInLocalStorage ? 'Quitar de favoritos' : 'Guardar en favoritos'}
                            </Button>
                        </Card.Header>

                        <Card.Body>
                            <Text size={30}>Sprites:</Text>
                            <Container direction='row' display='flex'>
                                <Image
                                    src={pokemon.sprites.front_default}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100} />

                                <Image
                                    src={pokemon.sprites.back_default}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100} />

                                <Image
                                    src={pokemon.sprites.front_shiny}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100} />

                                <Image
                                    src={pokemon.sprites.back_shiny}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100} />
                            </Container>
                        </Card.Body>
                    </Card>
                </Grid>

            </Grid.Container>
        </Layout>
    )
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {

    const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');
    const pokemonNames: string[] = data.results.map(pokemon => pokemon.name);

    return {
        paths: pokemonNames.map(name => ({
            params: { name }
        })),
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {

    const { name } = params as { name: string };
    return {
        props: {
            pokemon: await getPokemonInfo(name)
        }
    }
}

export default PokemonByNamePage;