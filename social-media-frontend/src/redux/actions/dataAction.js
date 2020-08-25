import { SET_SCREAMS, 
        LOADING_DATA, 
        LIKE_SCREAM, 
        UNLIKE_SCREAM, 
        DELETE_SCREAM, 
        POST_SCREAM, 
        CLEAR_ERRORS, 
        SET_ERRORS, 
        LOADING_UI,
        SET_SCREAM,
        STOP_LOADING_UI,
        POST_COMMENT,  
    } from '../types'
import axios from 'axios'

//Get all Screams
export const getScreams = () => ( dispatch ) => {
    dispatch({ type : LOADING_DATA })
    axios.get('/screams')
    .then(res=>{
        dispatch({
            type : SET_SCREAMS,
            payload : res.data
        })
    }).catch(err =>{
        dispatch({
            type: SET_SCREAMS,
            payload : []
        })
    })

}

//LikeScreams
export const likeScream = ( screamId ) => ( dispatch ) =>{
    axios.get(`/scream/${screamId}/like`)
    .then(res=>{
        dispatch({
            type: LIKE_SCREAM,
            payload: res.data
        })
    })
    .catch(err => console.log('erros', err))
}

//Unlike Screams
export const unLikeScream = ( screamId ) => ( dispatch ) =>{
    axios.get(`/scream/${screamId}/unlike`)
    .then(res=>{
        dispatch({
            type: UNLIKE_SCREAM,
            payload: res.data
        })
    })
    .catch(err => console.log('erros', err))
}

//delete Scream
export const deleteScream = (screamId) => (dispatch) =>{
    dispatch({ type: LOADING_UI })
    axios.delete(`/scream/${screamId}`)
    .then(()=>{
        dispatch({
            type: DELETE_SCREAM,
            payload: screamId
        })
    }).catch(err=>console.log(err));
}

//Post a scream
export const postScream = (newScream) =>  (dispatch) => {
    dispatch({ type: LOADING_UI })
    axios.post('/scream',newScream)
    .then(res => {
        dispatch({
            type: POST_SCREAM,
            payload : res.data
        });
        dispatch(clearErrors())
    })
    .catch(err =>{
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        })
    })
}

//get a scream
export const getScream = ( screamId ) => ( dispatch ) => {
    dispatch( { type: LOADING_UI } )
    axios.get(`/scream/${screamId}`)
    .then(res =>{
        dispatch({
            type: SET_SCREAM,
            payload: res.data
        });
        dispatch({ type: STOP_LOADING_UI })
    }).catch(err=>console.log('error', err))
}    
//postComment
export const postComment=(screamId,newComment) =>( dispatch) =>{
axios.post(`/scream/${screamId}/comment`,newComment)
.then(res=>{
    dispatch({
        type:POST_COMMENT,
        payload: res.data
    })
    dispatch(clearErrors())
}).catch(err=>{
    dispatch({
        type: SET_ERRORS,
        payload: err.response.data
    })
})
}
//Get a userPage
export const getUser = (userHandle) => ( dispatch ) =>{
    dispatch({ type: LOADING_DATA })
    axios.get(`/user/${userHandle}`)
    .then(res =>{
        dispatch({
            type: SET_SCREAMS,
            payload: res.data.screams
        })
    }).catch(()=>{
        dispatch({
            type: SET_SCREAMS,
            payload: null
        })
})
    }


//Clear Error
export const clearErrors = () => ( dispatch ) => {
    dispatch( { type: CLEAR_ERRORS } )
}
