import axios from "../../utils/axios";
import { loadPerson } from "../reducers/personSlice";
export { removePerson } from "../reducers/personSlice";

export const asyncLoadPerson = (id) => async (dispatch, getState) => {
  try {
    const details = await axios.get(`/person/${id}`);
    const externalid = await axios.get(`/person/${id}/external_ids`);
    const combinedCredits = await axios.get(`/person/${id}/combined_credits`);
    const tvCredits = await axios.get(`/person/${id}/tv_credits`);
    const movieCredits = await axios.get(`/person/${id}/movie_credits`);

    let ultimateDetails = {
      details: details.data,
      externalid: externalid.data,
      combinedCredits: combinedCredits.data,
      tvCredits: tvCredits.data,
      movieCredits: movieCredits.data,
    };

    dispatch(loadPerson(ultimateDetails));
  } catch (error) {
    console.log("Error: ", error);
  }
};
