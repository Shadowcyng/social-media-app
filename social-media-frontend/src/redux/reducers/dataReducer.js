import { SET_SCREAM, SET_SCREAMS,
    LIKE_SCREAM, UNLIKE_SCREAM,
    LOADING_DATA, DELETE_SCREAM,
    POST_SCREAM,  POST_COMMENT
} from '../types';

const initialState = {
    screams: [],
    scream : {},
    loading : false,
    // errors: {}
};

export default function(state = initialState, action){
    let index;
    switch(action.type){
        case LOADING_DATA :
            return {
                ...state,
                loading: true,
            }     
        case SET_SCREAMS :
            return {
                ...state,
                screams: action.payload,
                loading: false,
            }
        case LIKE_SCREAM :
        case UNLIKE_SCREAM :
            index = state.screams.findIndex((scream)=> scream.screamId === action.payload.screamId)
            state.screams[index] = action.payload
            if(state.scream.screamId === action.payload.screamId){
             state.scream = action.payload
             }
            return {
                ...state, 
            }
        case DELETE_SCREAM :
            index = state.screams.findIndex(scream => scream.screamId === action.payload )
            state.screams.splice(index ,1)
            return {
                ...state,
                loading: false
            }
        case POST_SCREAM :
            return {
                ...state,
                screams: [action.payload, 
                    ...state.screams ]
            }
        case SET_SCREAM :
            return {
                ...state,
                scream : action.payload,
            }
        case POST_COMMENT :
            return{
                ...state,
                scream :{
                    ...state.scream,
                    comments:[action.payload, ...state.scream.comments]
                     
                }
            }

        default : return state;
    }
}