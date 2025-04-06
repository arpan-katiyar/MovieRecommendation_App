import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Trending from "./components/Trending";
import Popular from "./components/Popular";
import Movies from "./components/Movies";
import TvShows from "./components/TvShows";
import People from "./components/People";
import MovieDetails from "./components/MovieDetails";
import TvDetailes from "./components/TvDetailes";
import PersonDetails from "./components/PersonDetails";
import Trailer from "./templates/Trailer";
import NotFound from "./components/NotFound";

function App() {
  return (
    <div className="bg-[#1F1E24] w-screen h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/popular" element={<Popular />}></Route>
        <Route path="/movies" element={<Movies />}></Route>
        <Route path="/tvShows" element={<TvShows />}></Route>
        <Route path="/people" element={<People />}></Route>
        <Route path="/movie/Detail/:id" element={<MovieDetails />}>
          <Route path="/movie/Detail/:id/trailer" element={<Trailer/>} />
        </Route>
        <Route path="/person/Detail/:id" element={<PersonDetails />}></Route>
        <Route path="/tv/Detail/:id" element={<TvDetailes />}></Route>
        <Route path="*" element={<NotFound />}></Route>

      </Routes>
    </div>
  );
}

export default App;
