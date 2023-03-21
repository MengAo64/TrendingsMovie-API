// import '../styles/globals.css'

const Movie = ({title, index , overview, popularity,vote_average, release_date,genre_ids , poster_path }) => {
    const IMAGES_API = 'https://image.tmdb.org/t/p/w500';

    return (
        <div className="movie" key={index}> 
            <h3>{title}</h3>
            <img src={IMAGES_API + poster_path} alt={title}/>
            <div className="movie-overview">{overview}</div>
            <div className="movie-release">release : {release_date}</div>
            <div className="movie-popularity">Popularity : {popularity}</div>
            <div className="movie-rate">Rate : {vote_average}</div>
        </div>

           
        )
         
}

export default Movie;