import "../css/MovieCard.css"
import { useMovieContext } from "../contexts/MovieContext"
import { useState, useEffect } from "react"

function MovieCard({ movie }) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext()
  const [isExpanded, setIsExpanded] = useState(false)
  const favorite = isFavorite(movie.id)

  function handleFavoriteClick(e) {
    e.stopPropagation()
    if (favorite) {
      removeFromFavorites(movie.id)
    } else {
      addToFavorites(movie)
    }
  }

  useEffect(() => {
    if (isExpanded) {
      document.body.classList.add('no-scroll')
    } else {
      document.body.classList.remove('no-scroll')
    }
  }, [isExpanded])

  return (
    <>
      <div className="movie-card" onClick={() => setIsExpanded(true)}>
        <div className="movie-poster">
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
          <div className="movie-overlay">
            <button className={`favorite-btn ${favorite ? "active" : ""}`} onClick={handleFavoriteClick}>
              ♥
            </button>
          </div>
        </div>
        <div className="movie-info">
          <h3>{movie.title}</h3>
          <p>{movie.release_date?.split("-")[0]}</p>
          
        </div>
      </div>

      {isExpanded && (
        <div className="expanded-overlay" onClick={() => setIsExpanded(false)}>
          <div className="expanded-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setIsExpanded(false)}>
              ×
            </button>
            <img 
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
              alt={movie.title} 
              className="expanded-poster"
            />
            <div className="expanded-info">
              <h2>{movie.title}</h2>
              <p className="release-date">{movie.release_date}</p>
              {/* Full summary */}
              {movie.overview && (
                <div className="full-summary">
                  <h4>Summary</h4>
                  <p>{movie.overview}</p>
                </div>
              )}
              <button 
                className={`favorite-btn-lg ${favorite ? "active" : ""}`} 
                onClick={handleFavoriteClick}
              >
                {favorite ? "Remove from Favorites" : "Add to Favorites"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default MovieCard