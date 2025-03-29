import axios from "../../utils/axios"
import { loadMovie } from "../reducers/movieSlice"
export {removeMovie} from "../reducers/movieSlice"

export const asyncLoadMovie =asyc(id)=>(dispatch,getState)=>{
    try {
        const details=await axios.get(`/movie/${id}`)
        const externalid=await axios.get(`/movie/${id}/external_ids`)
        const recommendations=await axios.get(`/movie/${id}/recommendations`)
        const similar=await axios.get(`/movie/${id}/similar`)
        const videos =await axios.get(`/movie/${id}/videos`)
        const watchProviders =await axios.get(`/movie/${id}/watch/providers`)
        let ultimateDetails={
            details:details.data,
            externalid:externalid.data,
            recommendations:recommendations.data,
            similar:similar.data,
            videos:videos.data,
            watchProviders:watchProviders.data

        }
        dispatch(loadMovie(ultimateDetails))
        
    } catch (error) {
        console.log("Error: ", error)
    }
    
}
