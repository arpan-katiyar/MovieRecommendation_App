import React from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ReactPlayer from "react-player";
import NotFound from "../pages/NotFound";

function Trailer() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const category = pathname.includes("movie") ? "movie" : "tv";
  const ytvideo = useSelector((state) => state[category].info.videos);

  return (
    <div className="w-screen h-screen top-0 left-0 z-[100] bg-[rgba(0,0,0,.95)] flex items-center justify-center absolute">
      <Link
        onClick={() => navigate(-1)}
        className="absolute hover:text-[#6556CD] ri-close-fill text-3xl text-white right-[3%] top-[3%]"
      ></Link>

      {ytvideo ? (
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${ytvideo.key}`}
          controls={true}
          playing={true}
          width={1000}
          height={550}
        />
      ) : (
        <NotFound />
      )}
    </div>
  );
}

export default Trailer;
