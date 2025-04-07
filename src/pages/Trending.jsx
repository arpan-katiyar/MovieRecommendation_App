import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Topnav from "../components/Topnav";
import Dropdown from "../components/Dropdown";
import axios from "../utils/axios";
import Cards from "../components/Cards";
import Loading from "./Loading";

function Trending() {
  const navigate = useNavigate();
  const [category, setCategory] = useState("all");
  const [duration, setDuration] = useState("day");
  const [trending, setTrending] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  document.title = "Movie App | Trending " + category;

  const getTrending = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/trending/${category}/${duration}?page=${page}`
      );
      if (data.results.length > 0) {
        setTrending((previous) => [...previous, ...data.results]);
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
    if (trending.length === 0) {
      getTrending();
    } else {
      setPage(1);
      setTrending([]);
      getTrending();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category, duration]);

  return trending.length > 0 ? (
    <div className="w-screen h-screen ">
      <div className="w-full  flex items-center  justify-between mb-5 px-[3%]   ">
        <h1 className="text-2xl font-semibold text-zinc-400 ">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD]  ri-arrow-left-line"
          ></i>
          Trending {category}({duration})
        </h1>
        <div className="flex w-[75%] items-center ">
          <Topnav />
          <div className="flex gap-2">
            <Dropdown
              title={"category"}
              options={["movie", "tv", "all"]}
              func={(e) => setCategory(e.target.value)}
            />
            <Dropdown
              title={"Duration"}
              options={["week", "day"]}
              func={(e) => setDuration(e.target.value)}
            />
          </div>
        </div>
      </div>
      <InfiniteScroll
        dataLength={trending.length} //This is important field to render the next data
        next={getTrending}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <Cards data={trending} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
}

export default Trending;
