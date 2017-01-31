import axios from "axios";

export function uploadFile(data){
    var config = {
        onUploadProgress: function(progressEvent) {
            var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
        }
    };
    return {
        type: "CREATE_LNK",
        payload: request
    };
}
