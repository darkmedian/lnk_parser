import axios from "axios";

export function uploadFile(data){
    var config = {
        onUploadProgress: function(progressEvent) {
            var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
            console.log(percentCompleted);
        }
    };
    const request = axios.post('upload/put', data, config);
    return {
        type: "CREATE_LNK",
        payload: request
    };
}