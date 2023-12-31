import Head from 'next/head'
import React, { FC, PropsWithChildren } from 'react'
import { Navbar } from '../ui/Navbar';

interface Props extends PropsWithChildren {
    title?: string;
}

const origin = (typeof window === 'undefined') ? '' : window.location.origin;

export const Layout: FC<Props> = ({ children, title }) => {

    return (
        <>
            <Head>
                <title>{title || 'PokemonApp'}</title>
                <meta name='author' content='Aaron Quintanal' />
                <meta name='description' content={'Información sobre el pokemon XXX'} />
                <meta name='keywords' content={`${title}, pokemon, pokedex`} />
                <meta property="og:title" content={`Información sobre ${title}`} />
                <meta property="og:description" content={`Esta es la página sobre ${title}.`} />
                <meta property="og:image" content={`${origin}/img/banner.png`} />
            </Head>

            <Navbar />

            <main style={{
                padding: '0 20px'
            }}>
                {children}
            </main>
        </>
    )
}
