import Head from 'next/head';
// import getConfig from 'next/config';
import { useEffect, useState } from 'react';
import Movie from '../src/components/movie';

// const {serverRuntimeConfig, publicRuntimeConfig} = getConfig ()

export default function Home(initialData) {
  const [searchResults, setSearchResults] = useState([])
  // const [formInput, setFormInputs] = useState({})
  const [searchTerm, setSearchTerm] = useState ('')

  useEffect(() => {
    setSearchResults(initialData.trendingMovies.results)
  }, [initialData])

  const handleInputs = (event) => {
    let {name, value} =event.target
    // setFormInputs({...formInputs, [name]: value});
    setSearchTerm(event.target.value);
  }

  const search = async (event) => {
    event.preventDefault()
    let movies = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=71b1711cab2e63d7f8e5be8ffd7ab9c5&query=${searchTerm}`)
    movies = await movies.json()
    setSearchResults(movies.results)

  }


  return (
    <div className="container">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
              <div className='wm'>
                Samuel Uno XI RPL
              </div>
       <div className='movieTitle'>Trendings Movies</div>
       <div className='searchMovie'>
        <form onSubmit={search}>
          <input className="search" name="searchTerm" value={searchTerm} onChange={handleInputs} type="text" placeholder='Cari film.....' required />
          {/* <button className='btn-search'>🔍</button> */}
        </form>
      </div>
      <div className='movie-search-result-grid'>
          {searchResults.map((each, index) => {
            return(
              <Movie
              key={each.id}
              index={each.id}
              title={each.title}
              poster_path={each.poster_path}
              overview={each.overview}
              release_date={each.release_date}
              popularity={each.popularity}
              vote_average={each.vote_average}

              />
            )
          })}
      </div>
    </div>
  )
}

export async function getStaticProps(context) {
  let trendingMovies = await fetch (`https://api.themoviedb.org/3/trending/movie/day?api_key=71b1711cab2e63d7f8e5be8ffd7ab9c5`)
  trendingMovies = await trendingMovies.json()

  console.log(trendingMovies)
  return {
    props: {trendingMovies: trendingMovies}, // will be passed to the page component as props
  }
}
