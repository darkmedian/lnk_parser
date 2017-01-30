import axios from "axios";

export function fetchSample(){
    return function(dispatch) {
        axios.get("/sample")
            .then((response) => {
                dispatch({type: "RECIEVE_SAMPLE", payload: response.data});
            })
            .catch((err) => {
                dispatch({type: "FETCH_SAMPLE_ERROR", payload: err});
            })
    }
}
