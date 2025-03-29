import { useEffect, useState } from "react";
import Loading from "./Loading";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";
import Topnav from "../templates/Topnav";
import InfiniteScroll from "react-infinite-scroll-component";
import Cards from "../templates/Cards";
function People() {
  const navigate = useNavigate();
  const [people, setPeople] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  document.title = `Movie App || People`;

  const getPeople = async () => {
    try {
      const { data } = await axios.get(`/person/popular?page=${page}`);
      if (data.results.length > 0) {
        setPeople((previous) => [...previous, ...data.results]);
        setPage((page) => page + 1);
        console.log(data);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPeople();
  }, []);
  console.log(people);
  return people.length > 0 ? (
    <div className="w-screen h-screen ">
      <div className="w-full  flex items-center   mb-5 px-[3%]   ">
        <h1 className="text-2xl font-semibold text-zinc-400 ">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD]  ri-arrow-left-line"
          ></i>
          Popular People
        </h1>
        <div className="w-[80%]">
          <Topnav />
        </div>
      </div>
      <InfiniteScroll
        dataLength={people.length} //This is important field to render the next data
        next={getPeople}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <Cards data={people} title={'person'} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
}

export default People;
