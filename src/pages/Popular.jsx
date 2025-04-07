import { useEffect, useState } from "react";
import Loading from "./Loading";
import Cards from "../components/Cards";
import axios from "../utils/axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import Topnav from "../components/Topnav";
import Dropdown from "../components/Dropdown";

function Popular() {
  const navigate = useNavigate();
  const [category, setCategory] = useState("movie");
  const [popular, setPopular] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  document.title = `Movie App | Popular ${category}`;

  const getPopular = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/${category}/popular?page=${page}`
      );
      if (data.results.length > 0) {
        setPopular((previous) => [...previous, ...data.results]);
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
    if (popular.length === 0) {
      getPopular();
    } else {
      setPage(1);
      setPopular([]);
      getPopular();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);
  return popular.length > 0 ? (
    <div className="w-screen h-screen ">
      <div className="w-full  flex items-center  justify-between mb-5 px-[3%]   ">
        <h1 className="text-2xl font-semibold text-zinc-400 ">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD]  ri-arrow-left-line"
          ></i>
          Popular in {category.toUpperCase()}
        </h1>
        <div className="flex w-[80%] items-center ">
          <Topnav />
          <div className="flex ">
            <Dropdown
              title={"category"}
              options={["movie", "tv"]}
              func={(e) => setCategory(e.target.value)}
            />
          </div>
        </div>
      </div>
      <InfiniteScroll
        dataLength={popular.length} //This is important field to render the next data
        next={getPopular}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <Cards data={popular} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
}

export default Popular;
