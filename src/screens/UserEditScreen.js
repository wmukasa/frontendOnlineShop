import React,{useState,useEffect}from 'react'
import { Link } from 'react-router-dom'
import {Form,Button} from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { getUserDetails,updateUser } from '../actions/userActions'
import { USER_UPDATE_RESET } from '../constants/userConstants'

function UserEditScreen({match,history}) {
  //lets get our user id
    const userId = match.params.id 

    //we set the two sets
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [isAdmin,setIsAdmin] = useState(false)

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    //we want to destructure that
    const {error,loading,user} = userDetails

    //here we want to get our updated user
    const userUpdate = useSelector(state => state.userUpdate)
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = userUpdate

    useEffect(() => {

        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET })
            history.push('/admin/userlist')
        } else {

            if (!user.name || user._id !== Number(userId)) {
                dispatch(getUserDetails(userId))
            } else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }

    }, [user, userId, successUpdate, history])
    const submitHandler =(e) =>{
        e.preventDefault()
        //console.log('Submitted')
        dispatch(updateUser({ _id: user._id, name, email, isAdmin }))
    }
    return (
        <div>
            <Link to='/admin/userlist'> Go Back</Link>
        <FormContainer>
            <h1>Edit User</h1>
                {loadingUpdate && <Loader/>}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message> }
                {loading ? <Loader/> :error ?<Message variant='danger'>{error}</Message> 
                :(
                    <Form onSubmit={submitHandler}
                    >
                        <Form.Group controlid='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                            type='name'
                            placeholder='Enter Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)} 
                            >
        
                            </Form.Control>
        
                        </Form.Group>
                        <Form.Group controlid='email'>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                            type='email'
                            placeholder='Enter Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} //on change we want to update our value
                                            //it going to be an error function, we take in the event
                            >
        
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlid='isAdmin'>
                            <Form.Check
                            type='checkbox'
                            label='Is Admin'
                            checked={isAdmin}
                            onChange={(e) => setIsAdmin(e.target.checked)} //on change we want to update our value
                                            //it going to be an error function, we take in the event
                            >
        
                            </Form.Check>
                        </Form.Group>
                        <Button type='submit' variant='primary'>
                            Update
                        </Button>
                    </Form>
                )}

        </FormContainer>
    </div>
    )
}

export default UserEditScreen
