import axios from "../../utils/axios";
import { loadTv } from "../reducers/tvSlice";
export { removeTv } from "../reducers/tvSlice";

export const asyncLoadTv = (id) => async (dispatch, getState) => {
  try {
    const details = await axios.get(`/tv/${id}`);
    const externalid = await axios.get(`/tv/${id}/external_ids`);
    const recommendations = await axios.get(`/tv/${id}/recommendations`);
    const similar = await axios.get(`/tv/${id}/similar`);
    const videos = await axios.get(`/tv/${id}/videos`);
    const watchProviders = await axios.get(`/tv/${id}/watch/providers`);
    const translations = await axios.get(`/tv/${id}/translations`);
    let ultimateDetails = {
      details: details.data,
      externalid: externalid.data,
      recommendations: recommendations.data.results,
      similar: similar.data.results,
      videos: videos.data.results.find((m) => m.type === "Trailer"),
      watchProviders: watchProviders.data.results.IN,
      translations: translations.data.translations.map((t) => t.english_name),
    };

    dispatch(loadTv(ultimateDetails));
  } catch (error) {
    console.log("Error: ", error);
  }
};
