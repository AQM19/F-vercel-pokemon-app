const toggleFavourite = (id: number) => {

    let favourites: number[] = JSON.parse(localStorage.getItem('Favourites') || '[]');

    if (favourites.includes(id)) {
        favourites = favourites.filter(pokeId => pokeId !== id)
    } else {
        favourites.push(id);
    }

    localStorage.setItem('Favourites', JSON.stringify(favourites));
}

const existInLocalStorage = (id: number): boolean => {
    // Si se genera del lado del servidor retorna falso.
    if (typeof window === 'undefined') return false;

    const favourites: number[] = JSON.parse(localStorage.getItem('Favourites') || '[]');
    return favourites.includes(id);
}

const pokemons = (): number[] => {
    return JSON.parse(localStorage.getItem('Favourites') || '[]');
}

export default {
    toggleFavourite,
    existInLocalStorage,
    pokemons
}