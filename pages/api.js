import axios from "axios"

export const searchMovie = async(q) => {
    const search = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${q}api_key=71b1711cab2e63d7f8e5be8ffd7ab9c5`)
    return search.data
}