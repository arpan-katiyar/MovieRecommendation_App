import React from "react";
import { Link } from "react-router-dom";

const Header = ({ data }) => {
  return (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.4),rgba(0,0,0,.7)),url(https://image.tmdb.org/t/p/original/${
          data.backdrop_path || data.profile_path
        }})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        // backgroundRepeat:"no-repeat"
      }}
      className="w-full h-[50vh] flex flex-col justify-end items-start p-[5%] "
    >
      <h1 className="font-black text-white text-5xl w-[70%]">
        {data.name || data.title || data.original_title || data.original_name}
      </h1>
      <p className="text-white w-[70%] mt-3 mb-3">
        {data.overview.slice(0,200)}... <Link to={`/${data.media_type}/Detail/${data.id}`} className="text-blue-400">more</Link>
      </p>
      <p className="text-white ">
      <i className="text-yellow-400 ri-megaphone-fill"></i>{data.release_date || "No Information"}
      <i className="ml-3 text-yellow-400 ri-album-fill"></i>{data.media_type.toUpperCase()}
      </p>
      <Link className="bg-red-500 p-3 text-white font-bold mt-3 rounded ">Watch Trailer</Link>
    </div>
  );
};

export default Header;
