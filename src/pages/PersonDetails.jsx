import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { asyncLoadPerson, removePerson } from "../store/actions/personActions";
import Loading from "./Loading";
import HorizontalCards from "../components/HorizontalCards";
import noimage from "/noimage.webp";
import Dropdown from "../components/Dropdown";

function PersonDetails() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [category, setCategory] = useState("movie");
  const { info } = useSelector((state) => state.person);
  useEffect(() => {
    dispatch(asyncLoadPerson(id));
    return () => {
      //clean up
      dispatch(removePerson());
    };
  }, [id]);
  return info ? (
    <div className="py-[2%] px-[10%] w-full bg-[#1F1E24] ">
      <nav className="w-full  text-zinc-100 mb-3  text-xl">
        {/* part 1 navigation */}
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-[#6556CD] ri-arrow-left-line"
        ></Link>
      </nav>
      <div className="w-full flex ">
        {/* part 2 left poster and details */}
        <div className="w-[20%] ">
          <img
            loading="lazy"
            className="object-cover w-[40vh]  shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)]"
            src={
              info.details.profile_path
                ? `https://image.tmdb.org/t/p/w342/${info.details.profile_path}`
                : noimage
            }
          ></img>
          <hr className="h-[2px] bg-zinc-400 mt-5 mb-5"></hr>
          {/* external  social media links */}
          <div className="text-xl text-white flex gap-x-3">
            <a
              href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
              target="_blank"
            >
              <i className="ri-earth-fill"></i>
            </a>
            <a
              href={`https://www.facebook.com/${info.externalid.facebook_id}`}
              target="_blank"
            >
              <i className="ri-facebook-circle-fill"></i>
            </a>
            <a
              href={`https://www.instagram.com/${info.externalid.instagram_id}`}
              target="_blank"
            >
              <i className="ri-instagram-fill"></i>
            </a>
            <a
              href={`https://www.x.com/${info.externalid.twitter_id}`}
              target="_blank"
            >
              <i className="ri-twitter-x-line"></i>
            </a>
          </div>

          {/* personal information */}
          <h1 className="text-2xl text-zinc-400 font-semibold my-5">
            Person Info
          </h1>
          <h1 className="text-lg text-zinc-400 font-semibold ">Known For</h1>
          <h1 className=" text-zinc-400  ">
            {info.details.known_for_department}
          </h1>
          <h1 className="text-lg text-zinc-400 font-semibold mt-3 ">Gender</h1>
          <h1 className=" text-zinc-400  ">
            {info.details.gender === 2 ? "Male" : "Female"}
          </h1>
          <h1 className="text-lg text-zinc-400 font-semibold ">Birthday</h1>
          <h1 className=" text-zinc-400  ">{info.details.birthday}</h1>
          <h1 className="text-lg text-zinc-400 font-semibold ">Death day</h1>
          <h1 className=" text-zinc-400  ">
            {info.details.deathday ? info.details.deathday : "Still Alive"}
          </h1>
          <h1 className="text-lg text-zinc-400 font-semibold ">
            Place Of Birth
          </h1>
          <h1 className=" text-zinc-400  ">
            {info.details.place_of_birth
              ? info.details.place_of_birth
              : "Unknown"}
          </h1>
          <h1 className="text-lg text-zinc-400 font-semibold ">
            Also Known As{" "}
          </h1>
          <h1 className=" text-zinc-400  ">
            {info.details.place_of_birth
              ? info.details.also_known_as.join(", ")
              : "Unknown"}
          </h1>
        </div>

        {/* part 3 right details and information */}
        <div className="w-[80%] ml-[5%]">
          <h1 className="text-5xl text-zinc-400 font-black my-5">
            {info.details.name}
          </h1>
          <h1 className="text-xl text-zinc-400 font-semibold ">Biography</h1>
          <p className="text-zinc-400 mt-3">{info.details.biography}</p>
          <h1 className="text-lg text-zinc-400 font-semibold mt-3 mb-3">
            Featured In
          </h1>
          <HorizontalCards data={info.combinedCredits.cast} />
          <div className="w-full flex justify-between">
            <h1 className="text-xl text-zinc-400 font-semibold mt-3 mb-3">
              Acting
            </h1>
            <Dropdown
              title="category"
              options={["tv", "movie"]}
              func={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className="w-full h-[50vh] overflow-x-hidden overflow-y-auto shadow-lg shadow-[rgba(255,255,255,.5)] mt-5 border-2 border-zinc-800 p-5 text-zinc-400 list-disc">
            {info[category + "Credits"].cast.map((c, i) => (
              <li
                key={i}
                className="hover:text-white duration-300 cursor-pointer mt-5"
              >
                <Link to={`/${category}/Detail/${c.id}`} className="">
                  <span>
                    {c.name || c.title || c.original_name || c.original_title}
                  </span>
                  <span className="block ml-5 mt-2">
                    {c.character && `Character Name:${c.character}`}
                  </span>
                </Link>
              </li>
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
}

export default PersonDetails;
