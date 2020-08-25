import { 
    SET_USER, 
    SET_ERRORS, 
    CLEAR_ERRORS, 
    LOADING_UI, 
    SET_UNAUTHENTICATED, 
    LOADING_USER,
    MARK_NOTIFICATIONS_READ
        } from '../types';
import axios from 'axios'

//login user
export const loginUser = (userData, history) => (dispatch) => {

    dispatch({type: LOADING_UI});
    axios
    .post('/login', userData)
    .then(res=>{
            setAuthorization(res.data.token)
            dispatch(getUserData());
            dispatch({type: CLEAR_ERRORS})
            history.push('/')
         
    }).catch(err=>{
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        })
    })
}
//signup user
export const signupUser = (newUserData, history) => (dispatch) => {
    dispatch({type: LOADING_UI});
    axios
    .post('/signup', newUserData)
    .then(res=>{
            setAuthorization(res.data.token)
            dispatch(getUserData());
            dispatch({type: CLEAR_ERRORS})
            history.push('/')
         
    }).catch(err=>{
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        })
    })
}
//logout user
export const logoutUser = () => (dispatch) =>{
    localStorage.removeItem('FBIdToken');
    delete axios.defaults.headers.common['Authorizaton'];
    dispatch({ type: SET_UNAUTHENTICATED })
};

//Upload profile image
export const uploadImage = (formData) => (dispatch) =>{
    dispatch({ type : LOADING_USER });
    axios.post('/user/image', formData )
    .then(()=>{
        return dispatch(getUserData())
    })
    .catch(err=> console.log(err) )
}
//Get user data
export const getUserData = () => (dispatch) =>{
    dispatch({type : LOADING_USER})
    axios
    .get('https://us-central1-social-media-7433e.cloudfunctions.net/api/user')
    .then(res =>{
        dispatch({
            type: SET_USER,
            payload: res.data
        })    
    })
    .catch(err =>{ 
        console.log('Error', err)
})
}
//edit profile
export const editUserDetails = (userDetails) => (dispatch) =>{
    dispatch({ type: LOADING_USER })
    axios.post('/user',userDetails)
    .then(()=>{
       dispatch(getUserData())
    }).catch(err => console.log(err))
}

//MarkNotification As Read
export const markNotificationRead = (notificationsIds) => (dispatch) =>{
    axios.post('/notifications',notificationsIds)
    .then(()=>{
        dispatch({ type: MARK_NOTIFICATIONS_READ })
    }).catch(err=>console.log('error', err))
}

//Helper funtion
const setAuthorization = (token) =>{
    const FBIdToken = `Bearer ${token}`
    localStorage.setItem('FBIdToken',   FBIdToken)
    axios.defaults.headers.common['Authorization'] = FBIdToken
}
