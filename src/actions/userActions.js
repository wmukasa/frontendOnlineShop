import axios from 'axios'
import { 
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,

    USER_LOGOUT,

    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,

    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_RESET,

    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_RESET,

    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_RESET,

    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,

    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
    USER_UPDATE_RESET,
   
} from '../constants/userConstants'

//we want to reset our orders on logout
import { ORDER_LIST_MY_RESET} from '../constants/OrderConstants'

//async helps to create a function within a function and then try to catch an error
export const login =(email,password) => async (dispatch) =>{
    try{
        dispatch({
            //this is throwing an object
            type:USER_LOGIN_REQUEST
        })
        //we are going this post as its own object
        const config = {
            headers:{
                'Content-type':'application/json'
            }
        }
        const {data} = await axios.post(
            '/api/users/login',
            {'username':email,'password':password},
            config
            )
        //if this request is successfull we want to send in a pillow
        dispatch({
            type:USER_LOGIN_SUCCESS,
            payload:data
        })
        //but we wanna set it in our localstorage with this user
        localStorage.setItem('userInfo',JSON.stringify(data))

    }catch(error){
            dispatch({
                type:USER_LOGIN_FAIL,
                payload:error.response && error.response.data.detail
                    ?error.response.data.detail
                    :error.message,
            })
    }
}

export const logout = () => (dispatch) =>{
    localStorage.removeItem('userInfo')
    dispatch({type:USER_LOGOUT})
    dispatch({type:USER_DETAILS_RESET})
    dispatch({type:ORDER_LIST_MY_RESET})
    dispatch({type:USER_LIST_RESET})

}

export const register =(name,email,password) => async (dispatch) =>{
    try{
        dispatch({
            //this is throwing an object
            type:USER_REGISTER_REQUEST
        })
        //we are going this post as its own object
        const config = {
            headers:{
                'Content-type':'application/json'
            }
        }
        const {data} = await axios.post(
            '/api/users/register/',
            {'name':name,'email':email,'password':password},
            config
            )
        //if this request is successfull we want to send in a pillow
        dispatch({
            type:USER_REGISTER_SUCCESS,
            payload:data
        })
        dispatch({
            type:USER_LOGIN_SUCCESS,
            payload:data
        })
        //but we wanna set it in our localstorage with this user
        localStorage.setItem('userInfo',JSON.stringify(data))

    }catch(error){
            dispatch({
                type:USER_REGISTER_FAIL,
                payload:error.response && error.response.data.detail
                    ?error.response.data.detail
                    :error.message,
            })
    }
}

export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DETAILS_REQUEST
        })
        const {
            userLogin: { userInfo },
        } = getState()
        const config = {
            headers: {
                'Content-type': 'application/json',
                 Authorization: `Bearer ${userInfo.token}`         
            }      
        }
        const { data } = await axios.get(
            `/api/users/${id}/`,
            config     
        )
        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
// it takes in the user object which will store name, email, password
    try {
        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST
        })
        const {
            //to update update our user information we need to be logined
            userLogin: { userInfo },
        } = getState()
        const config = {
            headers: {
                'Content-type': 'application/json',
                //use send our authorization to our heads thats why we use our token
                 Authorization: `Bearer ${userInfo.token}`         
            }      
        }
        const { data } = await axios.put(
            //we use our request as put
            `/api/users/profile/update/`,
            //we have to pass in our user object here
            user,
            config     
        )
        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data
        })
        //once we dispatch that data, we want our user login with new information 
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        }) 
        //we want to update our local storage with that new user information
        localStorage.setItem('userInfo',JSON.stringify(data))   
    } catch (error) {
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const listUsers = () => async (dispatch, getState) => {
    // it takes in the user object which will store name, email, password
    try {
        dispatch({
        type: USER_LIST_REQUEST
            })
            const {
                //to update update our user information we need to be logined
                userLogin: { userInfo },
            } = getState()
            const config = {
                headers: {
                    'Content-type': 'application/json',
                    //use send our authorization to our heads thats why we use our token
                     Authorization: `Bearer ${userInfo.token}`         
                }      
            }
            const { data } = await axios.get(
                //we use our request as put
                `/api/users/`,
                //we have to pass in our user object here
                
                config     
            )
            dispatch({
                type: USER_LIST_SUCCESS,
                payload: data
            })
   
        } catch (error) {
            dispatch({
                type: USER_LIST_FAIL,
                payload: error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
            })
        }
    }

export const deleteUser = (id) => async (dispatch, getState) => {
        // it takes in the user object which will store name, email, password
            try {
                dispatch({
                    type: USER_DELETE_REQUEST
                })
                const {
                    //to update update our user information we need to be logined
                    userLogin: { userInfo },
                } = getState()
                const config = {
                    headers: {
                        'Content-type': 'application/json',
                        //use send our authorization to our heads thats why we use our token
                         Authorization: `Bearer ${userInfo.token}`         
                    }      
                }
                const { data } = await axios.delete(
                    //we use our request as put
                    `/api/users/delete/${id}/`,
                    //we have to pass in our user object here
                    
                    config     
                )
                dispatch({
                    type: USER_DELETE_SUCCESS,
                    payload: data
                })
       
            } catch (error) {
                dispatch({
                    type: USER_DELETE_FAIL,
                    payload: error.response && error.response.data.detail
                        ? error.response.data.detail
                        : error.message,
                })
            }
}

export const updateUser = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(
            `/api/users/update/${user._id}/`,
            user,
            config
        )

        dispatch({
            type: USER_UPDATE_SUCCESS,
        })

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: USER_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}