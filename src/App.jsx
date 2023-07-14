import { useState, useEffect } from "react";
import MovieCard from "./MOvieCard";
import SearchIcon from "./search.svg";
import "./App.css";
const BaseUrl = "https://omdbapi.com/?apikey=99009e32";
function App() {
	const [title, setTitle] = useState("");
	const [movies, setMovies] = useState([]);
	useEffect(() => {
		fetchMovie("Avengers");
	}, []);
	const fetchMovie = async (title) => {
		const fetchData = await fetch(`${BaseUrl}&s=${title}`);
		const Data = await fetchData.json();
		const MovieData = Data.Search;
    console.log(title)
		setMovies(MovieData);
	};

	return (
		<div className="app">
      <h1>MisterCap Movies</h1>
			<div className="search">
				<input
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					placeholder="Search for movies"
				/>
				<img src={SearchIcon} alt="search" onClick={() => fetchMovie(title)} />
			</div>

			{movies?.length > 0 ? (
				<div className="container">
					{movies.map((movie) => (
						<MovieCard movie={movie} key={movie.imdbID} />
					))}
				</div>
			) : (
				<div className="empty">
					<h2>No movies found</h2>
				</div>
			)}
		</div>
	);
}

export default App;
