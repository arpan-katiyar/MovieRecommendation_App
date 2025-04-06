import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { asyncLoadTv, removeTv } from "../store/actions/tvActions";
import Loading from "./Loading";
import HorizontalCards from "../templates/HorizontalCards";
import noimage from "/noimage.webp";
function TvDetailes() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { info } = useSelector((state) => state.tv);
  useEffect(() => {
    dispatch(asyncLoadTv(id));
    return () => {
      //clean up
      dispatch(removeTv());
    };
  }, [id]);
  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.4),rgba(0,0,0,.7)),url(https://image.tmdb.org/t/p/original/${info.details.backdrop_path}})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        // backgroundRepeat:"no-repeat"
      }}
      className="w-screen  px-[10%] py-[2%] text-white"
    >
      <nav className="w-full h-[10vh] text-zinc-100 flex gap-10 items-center  text-xl">
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-[#6556CD] ri-arrow-left-line"
        ></Link>
        <a href={info.details.homepage} target="_blank">
          <i className="ri-external-link-fill"></i>
        </a>
        <a
          href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
          target="_blank"
        >
          <i className="ri-earth-fill"></i>
        </a>
        <a
          href={`https://www.imdb.com/title/${info.externalid.imdb_id}`}
          target="_blank"
        >
          imdb
        </a>
      </nav>

      <div className="w-full flex">
        <img
          className="object-cover w-[40vh]  shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)]"
          src={
            info.details.backdrop_path || info.details.poster_path
              ? `https://image.tmdb.org/t/p/original/${
                  info.details.backdrop_path || info.details.poster_path
                }`
              : noimage
          }
        ></img>

        <div className="content ml-[5%] ">
          <h1 className="text-5xl text-white font-black">
            {info.details.name ||
              info.details.title ||
              info.details.original_name ||
              info.details.original_title}
            <small className="text-2xl font-bold text-zinc-300">
              ({info.details.first_air_date.split("-")[0]})
            </small>
          </h1>

          <div className="flex mt-3 mb-5 text-white items-center gap-x-5 font-bold ">
            <span className="bg-yellow-600  rounded-full w-[5vh] h-[5vh] text-xl text-white font-semibold flex justify-center items-center p-[3.5vh]">
              {(info.details.vote_average * 10).toFixed()}
              <sup>%</sup>
            </span>
            <h1>User Score</h1>
            <h1>{info.details.first_air_date}</h1>
            <h1>{info.details.genres.map((g) => g.name).join(",")}</h1>
            <h1>{info.details.runtime}min</h1>
          </div>

          <h1 className="text-zinc-200 text-xl font-semibold italic">
            {info.details.tagline}
          </h1>
          <h1 className="text-white text-2xl mt-5 mb-3 ">Overview</h1>
          <p className="text-white">{info.details.overview}</p>
          <h1 className="text-white text-2xl mt-5 mb-3 ">
            Movie Translated In
          </h1>
          <p className="text-white mb-3">{info.translations.join(", ")}</p>
          <Link
            className="text-white rounded-lg bg-[#6556CD] px-3 py-2 "
            to={`${pathname}/trailer`}
          >
            <i className="ri-play-mini-fill mr-1"></i>
            Play Trailer
          </Link>
        </div>
      </div>

      {/* part 3 available */}
      <div className="w-[80%]  flex flex-col gap-y-5 mt-10 mb-10">
        {info.watchProviders && info.watchProviders.flatrate && (
          <div className="flex gap-x-5 items-center text-white">
            <h1> Available on Plateforms</h1>
            {info.watchProviders.flatrate.map((w, i) => (
              <img
                title={w.provider_name}
                className="w-[5vh] h-[5vh] object-cover rounded-md"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                key={i}
              />
            ))}
          </div>
        )}

        {info.watchProviders && info.watchProviders.rent && (
          <div className="flex gap-x-5 items-center text-white">
            <h1> Available to Buy</h1>
            {info.watchProviders.rent.map((w, i) => (
              <img
                title={w.provider_name}
                className="w-[5vh] h-[5vh] object-cover rounded-md"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                key={i}
              />
            ))}
          </div>
        )}

        {info.watchProviders && info.watchProviders.buy && (
          <div className="flex gap-x-5 items-center text-white">
            <h1> Available on Rent</h1>
            {info.watchProviders.buy.map((w, i) => (
              <img
                title={w.provider_name}
                className="w-[5vh] h-[5vh] object-cover rounded-md"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                key={i}
              />
            ))}
          </div>
        )}
      </div>
      {/* part 4 seasons */}

      <hr className="h-[2px] bg-zinc-400"></hr>
      <h1 className="text-3xl font-bold text-white mb-3 mt-3">Seasons</h1>

      <div className="w-full  flex  overflow-y-hidden ">
        {info.details.seasons.length >0?info.details.seasons.map((s, i) => (
          <div className="w-[20vw] mr-[2%] mb-5" key={i}>
            <img key={i}
              className="object-cover min-w-[12vw] h-[30vh] shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)]"
              src={
                s.poster_path
                  ? `https://image.tmdb.org/t/p/original/${s.poster_path}`
                  : noimage
              }
            ></img>
            <h1 className="text-xl text-zinc-400 font-semibold mt-2">
              {s.name || s.title || s.original_name || s.original_data}
            </h1>
          </div >
        )):<h1 className="text-3xl text-white font-black text-center mt-5">Nothing to show</h1>}
      </div>

      {/* part-5 recommondations */}
      <hr className="h-[2px] bg-zinc-400 mt-5"></hr>
      <h1 className="text-3xl font-bold text-white mb-3 mt-3">
        Recommandations & Similar stuff
      </h1>
      <HorizontalCards
        data={info.recommandations ? info.recommandations : info.similar}
      />
      <Outlet />
    </div>
  ) : (
    <Loading />
  );
}

export default TvDetailes;
