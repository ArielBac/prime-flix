import { useEffect, useState } from "react";
import api from "../../services/api";

//API URL = movie/now_playing?api_key=b86bd0de408f7438505826d8cd953596

function Home() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        async function loadMovies() {
            const response = await api.get("movie/now_playing", {
                params: {
                    api_key: "b86bd0de408f7438505826d8cd953596",
                    language: "en",
                    page: 1,
                }
            });
        
            console.log(movies)
        }

        loadMovies();
    }, []);


    return (
        <div>
            <h1>Home</h1>
        </div>
    );
}

export default Home;