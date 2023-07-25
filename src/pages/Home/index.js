import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

import './style.css';

import Loading from "../../components/Loading";
//API URL = movie/now_playing?api_key=b86bd0de408f7438505826d8cd953596

function Home() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadMovies() {
            const response = await api.get("movie/now_playing", {
                params: {
                    api_key: "b86bd0de408f7438505826d8cd953596",
                    language: "en",
                    page: 1,
                }
            });
        
            // console.log(response.data.results.slice(0, 10));
            setMovies(response.data.results.slice(0, 10));
            setLoading(false);
        }

        loadMovies();
    }, []);

    if (loading) {
        return (
            <Loading text="Loading movies..." />
        )
    }

    return (
        <div className="container">
            <div className="movie-list">
                {movies.map((movie) => {
                    return (
                        <article key={movie.id}>
                            <strong>{movie.title}</strong>
                            <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={movie.title} />
                            <Link to={`/movie/${movie.id}`}>Access</Link>
                        </article>
                    )
                })}
            </div>
        </div>
    );
}

export default Home;