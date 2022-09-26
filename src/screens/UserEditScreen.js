import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { getUserDetails, updateUser } from '../actions/userActions'
import { USER_UPDATE_RESET } from '../constants/userConstants'

const UserEditScreen = ({match, history}) => {
    const userId = match.params.id

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const dispatch = useDispatch()

    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails

    const userUpdate = useSelector((state) => state.userUpdate)
    const { loading: updateLoading, error: updateError, success: updateSuccess } = userUpdate

    useEffect(() => {
       if (updateSuccess) {
            dispatch({ type: USER_UPDATE_RESET })
            history.push('/admin/userlist')
          } else {
            if (!user.name || user._id !== userId) {
              dispatch(getUserDetails(userId))
            } else {
              setName(user.name)
              setEmail(user.email)
              setIsAdmin(user.isAdmin)
            }
        }

     } ,[dispatch,userId, user, updateSuccess,history])

    const submitHandler = (e) => {
        e.preventDefault()
       dispatch(updateUser({ _id: userId, name, email, isAdmin }))
    }

  return (

    <>
        <Link to='/admin/userlist' className='btn btn-light py-3'>
            Nazad
        </Link>

        <FormContainer>
        <h1>Promeni korisnika</h1>
        <br></br>
        {updateLoading && <Loader />}
        {updateError && <Message variant='danger'>{updateError}</Message>}

        {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
            <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
                <Form.Label>
                    Korisnicko ime:
                </Form.Label>

                <Form.Control
                    type='name'
                     placeholder='Upisi ime'
                     value={name}
                     onChange={(e) => setName(e.target.value)}>     
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='email'>
                <Form.Label>
                    Email adresa:
                </Form.Label>

                <Form.Control
                    type='email'
                     placeholder='Upisi email'
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}>     
                </Form.Control>
            </Form.Group>


            <Form.Group controlId='isadmin'>
                <Form.Check
                    type='checkbox'
                     label='Admin'
                     checked={isAdmin}
                     onChange={(e) => setIsAdmin(e.target.checked)}>     
                </Form.Check>
            </Form.Group>
<br></br>
            <Button type='submit' variant='primary'>
                Promeni
            </Button>

        </Form>
        )}

        
    </FormContainer>
    </>
  )
}

export default UserEditScreen
