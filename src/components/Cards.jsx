// import { Link } from "react-router-dom";
// import noimage from "/noimage.webp";
// function Cards({ data, title }) {
//   console.log(title);
//   return (
//     <div className="w-full h-full flex flex-wrap px-[3%] bg-[#1F1E24]">
//       {data.map((t, i) => (
//         <Link
//           to={`/${t.media_type || title}/Detail/${t.id}`}
//           className=" w-[26vh] mr-[3%] mb-[3%]  relative"
//           key={i}
//         >
//           <img
//             className="object-cover h-[40vh] shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)]"
//             src={
//               t.backdrop_path || t.poster_path || t.profile_path
//                 ? `https://image.tmdb.org/t/p/original/${
//                     t.backdrop_path || t.poster_path || t.profile_path
//                   }`
//                 : noimage
//             }
//           ></img>
//           <h1 className="text-xl text-zinc-400 font-semibold mt-2">
//             {t.name || t.title || t.original_name || t.original_data}
//           </h1>
//           {t.vote_average >= "0" && (
//             <div className="bg-yellow-600 absolute bottom-[35%] right-[-10%] rounded-full w-[5vh] h-[5vh] text-xl text-white font-semibold flex justify-center items-center p-[3.5vh]">
//               {(t.vote_average * 10).toFixed()}
//               <sup>%</sup>
//             </div>
//           )}
//         </Link>
//       ))}
//     </div>
//   );
// }

// export default Cards;

// after image optimization

// import { Link } from "react-router-dom";
// import noimage from "/noimage.webp";

// function Cards({ data, title }) {
//   return (
//     <div className="w-full flex flex-wrap justify-center gap-6 px-[3%] py-6 bg-[#1F1E24]">
//       {data.map((t, i) => {
//         const imagePath = t.backdrop_path || t.poster_path || t.profile_path;
//         const imageUrl = imagePath
//           ? `https://image.tmdb.org/t/p/w500${imagePath}`
//           : noimage;

//         const displayTitle =
//           t.name || t.title || t.original_name || t.original_title || "No Title";

//         const rating =
//           typeof t.vote_average === "number" && t.vote_average > 0
//             ? (t.vote_average * 10).toFixed()
//             : null;

//         return (
//           <Link
//             to={`/${t.media_type || title}/Detail/${t.id}`}
//             className="w-[180px] bg-zinc-900 rounded-md shadow-md hover:scale-[1.03] transition-transform relative"
//             key={i}
//           >
//             <img
//               src={imageUrl}
//               alt={displayTitle}
//               loading="lazy"
//               className="h-[250px] w-full object-cover rounded-t-md"
//             />
//             <div className="p-3">
//               <h1 className="text-md text-zinc-200 font-semibold line-clamp-2">
//                 {displayTitle}
//               </h1>
//             </div>

//             {rating && (
//               <div className="bg-yellow-600 absolute bottom-[45%] right-[-10%] rounded-full w-[45px] h-[45px] text-white font-bold text-sm flex items-center justify-center shadow-md">
//                 {rating}
//                 <sup className="text-xs ml-0.5">%</sup>
//               </div>
//             )}
//           </Link>
//         );
//       })}
//     </div>
//   );
// }

// export default Cards;

//using shadcn ui library

import { Link } from "react-router-dom";
import noimage from "/noimage.webp";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

function Cards({ data, title }) {
  return (
    <div className="w-full flex flex-wrap justify-center gap-6 px-[3%] py-6 bg-[#1F1E24]">
      {data.map((t, i) => {
        const imagePath = t.backdrop_path || t.poster_path || t.profile_path;
        const imageUrl = imagePath
          ? `https://image.tmdb.org/t/p/w500${imagePath}`
          : noimage;

        const displayTitle =
          t.name || t.title || t.original_name || t.original_title || "No Title";

        const rating =
          typeof t.vote_average === "number" && t.vote_average > 0
            ? (t.vote_average * 10).toFixed()
            : null;

        return (
          <Link
            to={`/${t.media_type || title}/Detail/${t.id}`}
            key={i}
            className="w-[180px] hover:scale-[1.03] transition-transform relative"
          >
            <Card className="bg-zinc-900 rounded-md shadow-md overflow-visible p-0 h-[330px]">
              {/* Image */}
              <img
                src={imageUrl}
                alt={displayTitle}
                loading="lazy"
                className="h-[250px] w-full object-cover rounded-t-md"
              />

              {/* Header with adjusted padding */}
              <CardHeader className="px-3 pt-2 pb-3">
                <CardTitle className="text-md text-zinc-200 font-semibold line-clamp-2 leading-snug">
                  {displayTitle}
                </CardTitle>
              </CardHeader>

              {/* Rating badge like your original */}
              {rating && (
                <div className="bg-yellow-600 absolute bottom-[45%] right-[-10%] rounded-full w-[45px] h-[45px] text-white font-bold text-sm flex items-center justify-center shadow-md">
                  {rating}
                  <sup className="text-xs ml-0.5">%</sup>
                </div>
              )}
            </Card>
          </Link>
        );
      })}
    </div>
  );
}

export default Cards;







