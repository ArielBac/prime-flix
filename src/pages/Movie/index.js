import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import api from "../../services/api";
import './style.css';

import Loading from "../../components/Loading";
import { toast } from "react-toastify";

function Movie() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadMovie() {
            await api.get(`/movie/${id}`, {
                params: {
                    api_key: "b86bd0de408f7438505826d8cd953596",
                    language: "en",
                }
            })
            .then((response) => {
                setMovie(response.data);
                setLoading(false);
            })
            .catch(() => {
                console.log("Movie not found!");
                navigate("/", { replace: true });
                return;
            })
        }

        loadMovie();

        return () => {
            console.log("Dismounted component.");
        }
    }, [navigate, id])

    function saveMovie() {
        const myMovieList = localStorage.getItem("@primeflix");

        let savedMovies = JSON.parse(myMovieList) || [];

        const hasMovie = savedMovies.some((savedMovie) => savedMovie.id === movie.id);

        if (hasMovie) {
            toast.warn("This movie already exists in the list!");
            return;
        }

        savedMovies.push(movie);
        localStorage.setItem("@primeflix", JSON.stringify(savedMovies));
        toast.success("Movie successfully saved");
    }

    if (loading) {
        return (
            <Loading text="Loading movie details..."/>
        )
    }

    return (
        <div className="movie-info">
            <h1>{movie.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt={movie.title} />
            <h3>Overview</h3>
            <span>{movie.overview}</span>
            <strong>Score: {movie.vote_average} / 10</strong>

            <div className="button-area">
                <button onClick={saveMovie}>Save</button>
                <button>
                    <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${movie.title} Trailer`}>
                        Trailer
                    </a>
                </button>
            </div>
        </div>
    );
}

export default Movie;