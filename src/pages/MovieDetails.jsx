// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   Link,
//   Outlet,
//   useLocation,
//   useNavigate,
//   useParams,
// } from "react-router-dom";
// import { asyncLoadMovie, removeMovie } from "../store/actions/movieActions";
// import Loading from "./Loading";
// import HorizontalCards from "../components/HorizontalCards";
// import noimage from "/noimage.webp";
// function MovieDetails() {
//   const { pathname } = useLocation();
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const { info } = useSelector((state) => state.movie);
//   useEffect(() => {
//     dispatch(asyncLoadMovie(id));
//     return () => {
//       //clean up
//       dispatch(removeMovie());
//     };
//   }, [id]);
//   return info ? (
//     <div
//       style={{
//         background: `linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.4),rgba(0,0,0,.7)),url(https://image.tmdb.org/t/p/original/${info.details.backdrop_path}})`,
//         backgroundPosition: "center",
//         backgroundSize: "cover",
//         // backgroundRepeat:"no-repeat"
//       }}
//       className="w-screen  px-[10%] py-[2%] text-white"
//     >
//       <nav className="w-full h-[10vh] text-zinc-100 flex gap-10 items-center  text-xl">
//         <Link
//           onClick={() => navigate(-1)}
//           className="hover:text-[#6556CD] ri-arrow-left-line"
//         ></Link>
//         <a href={info.details.homepage} target="_blank">
//           <i className="ri-external-link-fill"></i>
//         </a>
//         <a
//           href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
//           target="_blank"
//         >
//           <i className="ri-earth-fill"></i>
//         </a>
//         <a
//           href={`https://www.imdb.com/title/${info.externalid.imdb_id}`}
//           target="_blank"
//         >
//           imdb
//         </a>
//       </nav>

//       <div className="w-full flex">
//         <img
//           className="object-cover w-[40vh]  shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)]"
//           src={
//             info.details.backdrop_path || info.details.poster_path
//               ? `https://image.tmdb.org/t/p/original/${
//                   info.details.backdrop_path || info.details.poster_path
//                 }`
//               : noimage
//           }
//         ></img>

//         <div className="content ml-[5%] ">
//           <h1 className="text-5xl text-white font-black">
//             {info.details.name ||
//               info.details.title ||
//               info.details.original_name ||
//               info.details.original_title}
//             <small className="text-2xl font-bold text-zinc-300">
//               ({info.details.release_date.split("-")[0]})
//             </small>
//           </h1>

//           <div className="flex mt-3 mb-5 text-white items-center gap-x-5 font-bold ">
//             <span className="bg-yellow-600  rounded-full w-[5vh] h-[5vh] text-xl text-white font-semibold flex justify-center items-center p-[3.5vh]">
//               {(info.details.vote_average * 10).toFixed()}
//               <sup>%</sup>
//             </span>
//             <h1>User Score</h1>
//             <h1>{info.details.release_date}</h1>
//             <h1>{info.details.genres.map((g) => g.name).join(",")}</h1>
//             <h1>{info.details.runtime}min</h1>
//           </div>

//           <h1 className="text-zinc-200 text-xl font-semibold italic">
//             {info.details.tagline}
//           </h1>
//           <h1 className="text-white text-2xl mt-5 mb-3 ">Overview</h1>
//           <p className="text-white">{info.details.overview}</p>
//           <h1 className="text-white text-2xl mt-5 mb-3 ">
//             Movie Translated In
//           </h1>
//           <p className="text-white mb-3">{info.translations.join(", ")}</p>
//           <Link
//             className="text-white rounded-lg bg-[#6556CD] px-3 py-2 "
//             to={`${pathname}/trailer`}
//           >
//             <i className="ri-play-mini-fill mr-1"></i>
//             Play Trailer
//           </Link>
//         </div>
//       </div>

//       {/* part 3 available */}
//       <div className="w-[80%]  flex flex-col gap-y-5 mt-10 mb-10">
//         {info.watchProviders && info.watchProviders.flatrate && (
//           <div className="flex gap-x-5 items-center text-white">
//             <h1> Available on Plateforms</h1>
//             {info.watchProviders.flatrate.map((w, i) => (
//               <img
//                 title={w.provider_name}
//                 className="w-[5vh] h-[5vh] object-cover rounded-md"
//                 src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
//                 key={i}
//               />
//             ))}
//           </div>
//         )}

//         {info.watchProviders && info.watchProviders.rent && (
//           <div className="flex gap-x-5 items-center text-white">
//             <h1> Available to Buy</h1>
//             {info.watchProviders.rent.map((w, i) => (
//               <img
//                 title={w.provider_name}
//                 className="w-[5vh] h-[5vh] object-cover rounded-md"
//                 src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
//                 key={i}
//               />
//             ))}
//           </div>
//         )}

//         {info.watchProviders && info.watchProviders.buy && (
//           <div className="flex gap-x-5 items-center text-white">
//             <h1> Available on Rent</h1>
//             {info.watchProviders.buy.map((w, i) => (
//               <img
//                 title={w.provider_name}
//                 className="w-[5vh] h-[5vh] object-cover rounded-md"
//                 src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
//                 key={i}
//               />
//             ))}
//           </div>
//         )}
//       </div>
//       {/* part-4 recommondations */}
//       <hr className="h-[2px] bg-zinc-400"></hr>
//       <h1 className="text-3xl font-bold text-white mb-3 mt-3">
//         Recommendations & Similar stuff
//       </h1>
//       <HorizontalCards
//         data={info.recommendations ? info.recommendations : info.similar}
//       />
//       <Outlet />
//     </div>
//   ) : (
//     <Loading />
//   );
// }

// export default MovieDetails;

// after image optimization

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { asyncLoadMovie, removeMovie } from "../store/actions/movieActions";
import Loading from "./Loading";
import HorizontalCards from "../components/HorizontalCards";
import noimage from "/noimage.webp";

function MovieDetails() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { info } = useSelector((state) => state.movie);

  useEffect(() => {
    dispatch(asyncLoadMovie(id));
    return () => dispatch(removeMovie());
  }, [id]);

  const bgImage = info?.details?.backdrop_path
    ? `https://image.tmdb.org/t/p/original/${info.details.backdrop_path}`
    : "";

  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.4),rgba(0,0,0,.7)),url(${bgImage})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      className="w-screen px-[10%] py-[2%] text-white"
    >
      {/* Navigation Icons */}
      <nav className="w-full h-[10vh] text-zinc-100 flex gap-10 items-center text-xl">
        <button
          onClick={() => navigate(-1)}
          className="hover:text-[#6556CD] ri-arrow-left-line"
        ></button>
        <a
          href={info.details?.homepage}
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="ri-external-link-fill"></i>
        </a>
        <a
          href={`https://www.wikidata.org/wiki/${info.externalid?.wikidata_id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="ri-earth-fill"></i>
        </a>
        <a
          href={`https://www.imdb.com/title/${info.externalid?.imdb_id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          IMDb
        </a>
      </nav>

      {/* Poster + Details */}
      <div className="w-full flex flex-col md:flex-row gap-8 mt-4">
        <img
          className="object-cover w-[40vh] shadow-xl rounded-md"
          src={
            info.details.backdrop_path || info.details.poster_path
              ? `https://image.tmdb.org/t/p/w500/${
                  info.details.backdrop_path || info.details.poster_path
                }`
              : noimage
          }
          alt="poster"
        />

        <div className="flex-1">
          <h1 className="text-4xl font-black">
            {info.details.name ||
              info.details.title ||
              info.details.original_name ||
              info.details.original_title}
            {info.details?.release_date && (
              <small className="text-2xl font-semibold text-zinc-300 ml-2">
                ({info.details.release_date.split("-")[0]})
              </small>
            )}
          </h1>

          <div className="flex flex-wrap items-center gap-5 mt-4 text-lg">
            {info.details.vote_average && (
              <span className="bg-yellow-600 rounded-full w-[5vh] h-[5vh] flex justify-center items-center text-white text-lg font-semibold shadow-md">
                {(info.details.vote_average * 10).toFixed()}
                <sup>%</sup>
              </span>
            )}
            <h2>User Score</h2>
            <h2>{info.details?.release_date}</h2>
            <h2>
              {info.details.genres?.map((g) => g.name).join(", ")}
            </h2>
            <h2>{info.details.runtime} min</h2>
          </div>

          <h2 className="italic text-zinc-300 mt-3">
            {info.details.tagline}
          </h2>

          <h2 className="text-2xl mt-6 mb-2">Overview</h2>
          <p className="text-white">{info.details.overview}</p>

          {info.translations && (
            <>
              <h2 className="text-2xl mt-6 mb-2">Movie Translated In</h2>
              <p className="text-white mb-3">
                {info.translations.join(", ")}
              </p>
            </>
          )}

          <Link
            to={`${pathname}/trailer`}
            className="inline-block mt-4 text-white bg-[#6556CD] px-4 py-2 rounded hover:opacity-90"
          >
            <i className="ri-play-mini-fill mr-2"></i>
            Play Trailer
          </Link>
        </div>
      </div>

      {/* Platforms */}
      <div className="w-[80%] flex flex-col gap-6 mt-10 mb-10">
        {info.watchProviders?.flatrate && (
          <div className="flex gap-x-5 items-center text-white flex-wrap">
            <h1>Available on Platforms:</h1>
            {info.watchProviders.flatrate.map((w, i) => (
              <img
                key={i}
                title={w.provider_name}
                className="w-[5vh] h-[5vh] object-cover rounded-md"
                src={`https://image.tmdb.org/t/p/w500/${w.logo_path}`}
              />
            ))}
          </div>
        )}

        {info.watchProviders?.rent && (
          <div className="flex gap-x-5 items-center text-white flex-wrap">
            <h1>Available to Rent:</h1>
            {info.watchProviders.rent.map((w, i) => (
              <img
                key={i}
                title={w.provider_name}
                className="w-[5vh] h-[5vh] object-cover rounded-md"
                src={`https://image.tmdb.org/t/p/w500/${w.logo_path}`}
              />
            ))}
          </div>
        )}

        {info.watchProviders?.buy && (
          <div className="flex gap-x-5 items-center text-white flex-wrap">
            <h1>Available to Buy:</h1>
            {info.watchProviders.buy.map((w, i) => (
              <img
                key={i}
                title={w.provider_name}
                className="w-[5vh] h-[5vh] object-cover rounded-md"
                src={`https://image.tmdb.org/t/p/w500/${w.logo_path}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Recommendations */}
      <hr className="h-[2px] bg-zinc-400" />
      <h1 className="text-3xl font-bold text-white mt-6 mb-4">
        Recommendations & Similar Stuff
      </h1>
      <HorizontalCards
        data={info.recommendations || info.similar || []}
      />

      <Outlet />
    </div>
  ) : (
    <Loading />
  );
}

export default MovieDetails;
