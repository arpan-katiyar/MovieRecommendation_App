import { useEffect, useState } from "react";
import Loading from "./Loading";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";
import Topnav from "../components/Topnav";
import Dropdown from "../components/Dropdown";
import InfiniteScroll from "react-infinite-scroll-component";
import Cards from "../components/Cards";

function TvShows() {
  const navigate = useNavigate();
  const [category, setCategory] = useState("airing_today");
  const [tvShows, setTvShows] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  document.title = `Movie App || Tv_Shows(${category})`;

  const getTvShows = async () => {
    try {
      const { data } = await axios.get(`/tv/${category}?page=${page}`);
      if (data.results.length > 0) {
        setTvShows((previous) => [...previous, ...data.results]);
        setPage((page) => page + 1);
        console.log(data);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const refreshHandler = () => {
    if (tvShows.length === 0) {
      getTvShows();
    } else {
      setPage(1);
      setTvShows([]);
      getTvShows();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);
  return tvShows.length > 0 ? (
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
              options={["airing_today", "on_the_air", "top_rated", "popular"]}
              func={(e) => setCategory(e.target.value)}
            />
          </div>
        </div>
      </div>
      <InfiniteScroll
        dataLength={tvShows.length} //This is important field to render the next data
        next={getTvShows}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <Cards data={tvShows} title={"tv"} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
}

export default TvShows;
