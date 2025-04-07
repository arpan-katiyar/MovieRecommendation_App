import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import Loading from "./pages/Loading";
// import Home from "./components/Home";
const Home = lazy(() => import("./pages/Home"));
const Trending = lazy(() => import("./pages/Trending"));
const Popular = lazy(() => import("./pages/Popular"));
const Movies = lazy(() => import("./pages/Movies"));
const TvShows = lazy(() => import("./pages/TvShows"));
const People = lazy(() => import("./pages/People"));
const MovieDetails = lazy(() => import("./pages/MovieDetails"));
const TvDetailes = lazy(() => import("./pages/TvDetailes"));
const PersonDetails = lazy(() => import("./pages/PersonDetails"));
const Trailer = lazy(() => import("./components/Trailer"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <div className="bg-[#1F1E24] w-screen h-screen">
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/popular" element={<Popular />}></Route>
          <Route path="/movies" element={<Movies />}></Route>
          <Route path="/tvShows" element={<TvShows />}></Route>
          <Route path="/people" element={<People />}></Route>
          <Route path="/movie/Detail/:id" element={<MovieDetails />}>
            <Route path="trailer" element={<Trailer />} />
          </Route>
          <Route path="/person/Detail/:id" element={<PersonDetails />}></Route>
          <Route path="/tv/Detail/:id" element={<TvDetailes />}>
            <Route path="trailer" element={<Trailer />} />
          </Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
