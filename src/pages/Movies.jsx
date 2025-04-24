import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Cards from "../components/Cards";
import Loading from "./Loading";
import Topnav from "../components/Topnav";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";
import Dropdown from "../components/Dropdown";

function Movies() {
  const navigate = useNavigate();
  const [category, setCategory] = useState("now_playing");
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  document.title = `Movie App | Movies ${category}`;

  const getMovies = async () => {
    try {
      const { data } = await axios.get(`/movie/${category}?page=${page}`);
      if (data.results.length > 0) {
        setMovies((previous) => [...previous, ...data.results]);
        setPage((page) => page + 1);
        console.log(data);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const refreshHandler = async () => {
    if (movies.length === 0) {
      await getMovies();
    } else {
      setPage(1);
      setMovies([]);
      await getMovies();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);
  console.log(movies);
  return movies.length > 0 ? (
    <div className="w-screen h-screen ">
      <div className="w-full  flex items-center  justify-between mb-5 px-[3%]   ">
        <h1 className="text-2xl font-semibold text-zinc-400 ">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD]  ri-arrow-left-line"
          ></i>
          Movies({category})
        </h1>
        <div className="flex w-[80%] items-center ">
          <Topnav />
          <div className="flex ">
            <Dropdown
              title={"category"}
              options={["now_playing", "popular", "top_rated", "upcoming"]}
              func={(e) => setCategory(e.target.value)}
            />
          </div>
        </div>
      </div>
      <InfiniteScroll
        dataLength={movies.length} //This is important field to render the next data
        next={getMovies}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <Cards data={movies} title={"movie"} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
}

export default Movies;
