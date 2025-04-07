import { Link } from "react-router-dom";
import noimage from "/noimage.webp";

function HorizontalCards({ data }) {
  return data.length > 0 ? (
    <div className="w-full  ">
      <div className=" w-full  flex overflow-x-auto overflow-y-hidden ">
        {data.map((t, i) => {
          return (
            <Link
              to={`/${t.media_type}/Detail/${t.id}`}
              key={i}
              className="min-w-[17%] min-h-[60vh]   bg-zinc-900 mr-3 mb-5"
            >
              <img
                className="w-full h-[50%] object-cover"
                src={
                  t.backdrop_path || t.poster_path
                    ? `https://image.tmdb.org/t/p/original/${
                        t.backdrop_path || t.poster_path
                      }`
                    : noimage
                }
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
  ) : (
    <h1 className="text-3xl text-white font-black text-center mt-5">
      Nothing to show
    </h1>
  );
}

export default HorizontalCards;
