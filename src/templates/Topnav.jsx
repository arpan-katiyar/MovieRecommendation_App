import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../utils/axios";
import noimage from "/noimage.webp";
function Topnav() {
  const [query, setQuery] = useState("");
  const [searches, setSearches] = useState([]);
  const getSearches = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      setSearches(data.results);
    } catch (error) {
      console.log(`error: ${error}`);
    }
  };
  useEffect(() => {
    getSearches();
  }, [query]);
  return (
    
<div className="w-[50%] h-[10vh] relative  flex mx-auto items-center ">
      <i className="ri-search-line text-zinc-400 text-2xl"></i>
      <input
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        className="text-zinc-600 bg-zinc-200 px-4 py-1 mx-5 outline-none border-none  w-[80%] text-xl rounded-full"
        type="text"
        placeholder="Search..."
      ></input>
      {query.length > 0 && (
        <i
          onClick={() => setQuery("")}
          className="ri-close-fill text-zinc-400 text-2xl cursor-pointer"
        ></i>
      )}

      <div className=" z-50 absolute bg-zinc-200 w-[80%] max-h-[50vh] top-[100%] left-[7.5%] overflow-auto rounded-md">
        {searches.map((m, i) => (
          <Link
            key={i}
            className="hover:text-black hover:bg-zinc-300 flex px-4 py-2 items-center justify-start border-b-2 border-zinc-100"
          >
            <img
              className="w-[10vh] h-[10vh] rounded object-cover"
              src={
                m.backdrop_path || m.profile_path
                  ? `https://image.tmdb.org/t/p/original/${
                      m.backdrop_path || m.profile_path
                    }`
                  : noimage
              }
              alt=""
            />
            <span className="font-semibold ml-4">
              {m.name || m.title || m.original_title || m.original_name}
            </span>
          </Link>
        ))}
      </div>
    </div>
    
    
  );
}

export default Topnav;
