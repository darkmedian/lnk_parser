const initialState = {
    fetching: true,
    userFetch: false,
    users: [],
    error: null
};
export default function reducer(state=initialState, action) {
    if (action.type === "SAMPLE_PENDING") {
        console.log(action.type);
        state =  {...state, fetching: true, userFetch: false};
    }
    else if (action.type === "FETCH_SAMPLE_ERROR") {
        console.log(action.type);
        state =  {...state, fetching: false, error: action.payload};
    } else if (action.type === "RECIEVE_SAMPLE"){
        state =  {...state, fetching: false, userFetch: true, users: action.payload}
    }
    return state;
};