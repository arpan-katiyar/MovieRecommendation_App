import React from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ReactPlayer from "react-player";
import NotFound from "../components/NotFound";
function Trailer() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const category = pathname.includes("movie") ? "movie" : "tv";
  const ytvideo = useSelector((state) => state[category].info.videos);
  return ytvideo? (
    <div className="w-screen h-screen top-0 left-0 z-[100] bg-[rgba(0,0,0,.9)] flex items-center justify-center absolute">
      <Link
        onClick={() => navigate(-1)}
        className=" absolute hover:text-[#6556CD] ri-close-fill text-3xl text-white right-[3%] top-[3%]"
      ></Link>
      <ReactPlayer
        width={1200}
        height={600}
        url={`https://www.youtube.com/watch?v=${ytvideo.key}`}
      />
    </div>
  ):<NotFound/>
}

export default Trailer;
