import { Link } from "react-router-dom";
import noimage from "/noimage.webp";
function Cards({ data, title }) {
  console.log(title);
  return (
    <div className="w-full h-full flex flex-wrap px-[3%] bg-[#1F1E24]">
      {data.map((t, i) => (
        <Link
          to={`/${t.media_type || title}/Detail/${t.id}`}
          className=" w-[26vh] mr-[3%] mb-[3%]  relative"
          key={i}
        >
          <img
            className="object-cover h-[40vh] shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)]"
            src={
              t.backdrop_path || t.poster_path || t.profile_path
                ? `https://image.tmdb.org/t/p/original/${
                    t.backdrop_path || t.poster_path || t.profile_path
                  }`
                : noimage
            }
          ></img>
          <h1 className="text-xl text-zinc-400 font-semibold mt-2">
            {t.name || t.title || t.original_name || t.original_data}
          </h1>
          {t.vote_average >= "0" && (
            <div className="bg-yellow-600 absolute bottom-[35%] right-[-10%] rounded-full w-[5vh] h-[5vh] text-xl text-white font-semibold flex justify-center items-center p-[3.5vh]">
              {(t.vote_average * 10).toFixed()}
              <sup>%</sup>
            </div>
          )}
        </Link>
      ))}
    </div>
  );
}

export default Cards;
