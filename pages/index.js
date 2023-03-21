import Head from 'next/head';
import getConfig from 'next/config';
import { useEffect, useState } from 'react';
import Movie from '../src/components/movie';

const {serverRuntimeConfig, publicRuntimeConfig} = getConfig ()

export default function Home(initialData) {
  const [searchResults, setSearchResults] = useState([])
  const [formInput, setFormInputs] = useState({})
  const [searchTerm, setSearchTerm] = useState ('')

  useEffect(() => {
    setSearchResults(initialData.trendingMovies.results)
  }, [initialData])

  const handleInputs = (event) => {
    let {name, value} =event.target
    setFormInputs({...formInputs, [name]: value});
    setSearchTerm(event.target.value);
  }

  const search = async (event) => {
    event.preventDefault()
    let movies = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}`)
    movies = await movies.json()
    setSearchResults(movies.results)
  }


  return (
    <div className="container">
      <Head>
        <div className='wm'>
          Samuel Uno XI RPL
        </div>
        <div className='movieTitle'>Trendings Movies</div>
        
        <link rel="icon" href="/favicon.ico" />
        <link rel='stylesheet' href='styles.css'/>
      </Head>
      {/* <div>
        <form onSubmit={search}>
          <input className="search" name="searchTerm" value={searchTerm} onChange={handleInputs} type="text" required />
          <button className='btn-search'>search</button>
        </form>
      </div> */}

      <div className='movie-search-result-grid'>
          {searchResults.map((each, index) => {
            return(
              <Movie
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

export async function getServerSideProps(context) {
  let trendingMovies = await fetch (`https://api.themoviedb.org/3/trending/movie/day?api_key=${serverRuntimeConfig.apiKey}`)
  trendingMovies = await trendingMovies.json()

  console.log(trendingMovies)
  return {
    props: {trendingMovies: trendingMovies}, // will be passed to the page component as props
  }
}
