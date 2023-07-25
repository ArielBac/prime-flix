import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './style.css';
import { toast } from 'react-toastify';

function Favorites() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        function loadFavoriteMovies(){
            const  myFavoriteMovies = localStorage.getItem("@primeflix");
            setMovies(JSON.parse(myFavoriteMovies) || []);
        }

        loadFavoriteMovies();
    }, [])

    function deleteMovie(id){
        let filterMovies = movies.filter((movie) => {
            return (movie.id !== id);
        })

        setMovies(filterMovies);
        localStorage.setItem("@primeflix", JSON.stringify(filterMovies));
        toast.success("Movie deleted successfully")
    }

    return (
        <div className='my-movies'>
            <h1>My Favorite Movies</h1>

            {movies.length === 0 && <span>You have no movies :(</span>}

            <ul>
                {movies.map((movie) => {
                    return (
                        <li key={movie.id}>
                            <span>{movie.title}</span>
                            <div>
                                <Link to={`/movie/${movie.id}`}>See details</Link>
                                <button onClick={() => deleteMovie(movie.id)}>Delete</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Favorites;