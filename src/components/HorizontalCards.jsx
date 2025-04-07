// import { Link } from "react-router-dom";
// import noimage from "/noimage.webp";

// function HorizontalCards({ data }) {
//   return data.length > 0 ? (
//     <div className="w-full  ">
//       <div className=" w-full  flex overflow-x-auto overflow-y-hidden ">
//         {data.map((t, i) => {
//           return (
//             <Link
//               to={`/${t.media_type}/Detail/${t.id}`}
//               key={i}
//               className="min-w-[17%] min-h-[60vh]   bg-zinc-900 mr-3 mb-5"
//             >
//               <img
//                 className="w-full h-[50%] object-cover"
//                 src={
//                   t.backdrop_path || t.poster_path
//                     ? `https://image.tmdb.org/t/p/original/${
//                         t.backdrop_path || t.poster_path
//                       }`
//                     : noimage
//                 }
//               ></img>
//               <div className="m-2">
//                 <h1 className=" font-semibold text-white text-xl ">
//                   {t.name || t.title || t.original_title || t.original_name}
//                 </h1>
//                 <p className="text-white  mt-1">
//                   {t.overview.slice(0, 60)}...
//                   <Link className="text-blue-400">more</Link>
//                 </p>
//               </div>
//             </Link>
//           );
//         })}
//       </div>
//     </div>
//   ) : (
//     <h1 className="text-3xl text-white font-black text-center mt-5">
//       Nothing to show
//     </h1>
//   );
// }

// export default HorizontalCards;

// improved with image optimization

import { Link } from "react-router-dom";
import noimage from "/noimage.webp";

function HorizontalCards({ data }) {
  return data.length > 0 ? (
    <div className="w-full">
      <div className="w-full flex overflow-x-auto overflow-y-hidden px-4">
        {data.map((t, i) => {
          const imagePath = t.backdrop_path || t.poster_path;
          const imageUrl = imagePath
            ? `https://image.tmdb.org/t/p/w500${imagePath}`
            : noimage;

          return (
            <Link
              to={`/${t.media_type}/Detail/${t.id}`}
              key={i}
              className="min-w-[200px] max-w-[200px] bg-zinc-900 rounded-md mr-4 mb-5 shadow-md hover:scale-[1.02] transition-transform"
            >
              <img
                src={imageUrl}
                alt={t.title || t.name}
                loading="lazy"
                className="w-full h-[250px] object-cover rounded-t-md"
              />
              <div className="p-3">
                <h2 className="font-semibold text-white text-lg">
                  {t.name || t.title || t.original_title || t.original_name}
                </h2>
                <p className="text-white text-sm mt-1">
                  {(t.overview?.slice(0, 60) || "No description available")}...
                  <Link className="text-blue-400 ml-1">more</Link>
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
