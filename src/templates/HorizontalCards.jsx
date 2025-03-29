import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";

function HorizontalCards({ data }) {
  return (
    <div className="w-full   p-[4vh] ">
      <div className=" w-full  flex overflow-x-auto overflow-y-hidden ">
        {data.map((t, i) => {
          return (
            <Link
              to={`/${t.media_type}/Detail/${t.id}`}
              key={i}
              className="min-w-[15%] min-h-[50vh]   bg-zinc-900 mr-3 mb-5"
            >
              <img
                className="w-full h-[50%] object-cover"
                src={`https://image.tmdb.org/t/p/original/${
                  t.backdrop_path || t.poster_path
                }`}
              ></img>
              <div className="m-2">
                <h1 className=" font-semibold text-white text-xl ">
                  {t.name || t.title || t.original_title || t.original_name}
                </h1>
                <p className="text-white  mt-1">
                  {t.overview.slice(0, 60)}...
                  <Link className="text-blue-400">more</Link>
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default HorizontalCards;
