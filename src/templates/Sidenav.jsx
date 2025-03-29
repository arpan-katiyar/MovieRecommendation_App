import { Link } from "react-router-dom";

function Sidenav() {
  return (
    <div className="w-[20%] h-full  border-r-1 border-zinc-400 p-5">
      <h1 className="text-white text-2xl font-bold">
        <i className="text-[#6556CD] ri-tv-fill mr-2"></i>
        <span>Movie App</span>
      </h1>
      <nav className="flex flex-col text-zinc-400 text-xl gap-2">
        <h1 className="text-white text-xl font-semibold mt-6 mb-3">
          New Feeds
        </h1>
        <Link to={'/trending'} className="hover:bg-[#6556CD] duration-300 hover:text-white rounded-lg p-3">
          <i className="ri-fire-fill mr-2"></i>Trending
        </Link>
        <Link to={'/popular'} className="hover:bg-[#6556CD] duration-300 hover:text-white rounded-lg p-3">
          <i className="ri-magic-fill mr-2"></i>Popular
        </Link>
        <Link to={'/movies'} className="hover:bg-[#6556CD] duration-300 hover:text-white rounded-lg p-3">
          <i className="ri-movie-2-line mr-2"></i>Movies
        </Link>
        <Link to={'/tvShows'} className="hover:bg-[#6556CD] duration-300 hover:text-white rounded-lg p-3">
          <i className="ri-tv-2-fill mr-2"></i> Tv Shows
        </Link>
        <Link to={'/people'} className="hover:bg-[#6556CD] duration-300 hover:text-white rounded-lg p-3">
          <i className="ri-team-fill mr-2"></i>People
        </Link>
      </nav>
      <hr className="border-none bg-zinc-400 h-[1px]"></hr>
      <nav className="flex flex-col text-zinc-400 text-xl gap-2">
        <h1 className="text-white text-xl font-semibold mt-6 mb-3">
          Website Information
        </h1>
        <Link className="hover:bg-[#6556CD] duration-300 hover:text-white rounded-lg p-3">
        <i className="ri-information-fill mr-2"></i>About
        </Link>
        <Link className="hover:bg-[#6556CD] duration-300 hover:text-white rounded-lg p-3">
        <i className="ri-phone-fill mr-2"></i>Contact
       </Link>
      </nav>
    </div>
  );
}

export default Sidenav;
