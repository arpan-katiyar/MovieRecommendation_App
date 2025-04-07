import { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidenav from "../components/Sidenav";
import Topnav from "../components/Topnav";
import axios from "../utils/axios";
import HorizontalCards from "../components/HorizontalCards";
import Dropdown from "../components/Dropdown";
import Loading from "./Loading";
function Home() {
  document.title = "Movie App | Homepage";
  const [wallpaper, setWallpaper] = useState(null);
  const [trending, setTrending] = useState(null);
  const [category, setCategory] = useState("all");
  const getHeaderWallpaper = async () => {
    try {
      const { data } = await axios.get(
        "https://api.themoviedb.org/3/trending/all/day"
      );

      setWallpaper(
        data.results[(Math.random() * data.results.length).toFixed()]
      );
    } catch (error) {
      console.log(error);
    }
  };
  const getTrending = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/trending/${category}/day`
      );
      setTrending(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    !wallpaper && getHeaderWallpaper();
    getTrending();
  }, [category]);
  console.log(trending);

  return wallpaper && trending ? (
    <>
      <div className="w-full h-full flex">
        <Sidenav />
        <div className="w-[80%] h-full overflow-hidden overflow-y-auto ">
          <Topnav />
          <Header data={wallpaper} />
          <div className="mt-5 mx-[4vh] flex justify-between items-center ">
            <h1 className="text-3xl font-bold   text-zinc-400">Trending</h1>
            <Dropdown
              title="filter"
              options={["tv", "movie", "all"]}
              func={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className="pl-[4vh]">
            <HorizontalCards data={trending} />
          </div>
        </div>
      </div>
    </>
  ) : (
    <Loading />
  );
}

export default Home;
