const initialState = {
    fetching: true,
    userFetch: false,
    LNKFetch: false,
    LNKProps: [],
    error: null
};
export default function reducer(state=initialState, action) {
    switch (action.type){
        case "CREATE_LNK_FULFILLED":
            return  {...state, LNKFetch: true, fetching: false, LNKProps: [...state.LNKProps,action.payload.data.data]};
        default:
            return state
    }
};
