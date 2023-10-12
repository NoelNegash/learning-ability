import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useRegisterMutation } from "../slices/usersApiSlice"
import { setCredentials } from "../slices/authSlice"
import { toast } from 'react-hot-toast'
import {Link } from "react-router-dom"
import { Form, Button, Row, Col } from "react-bootstrap"
import FormContainer from "../components/FormContainer"
import Loader from "../components/Loader"

const SignUpScreen = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [register, {isLoading}] = useRegisterMutation()

    const { userInfo } = useSelector( (state) => state.auth)

    useEffect(() => {
        if (userInfo) navigate('/')
    }, [navigate, userInfo]);



    const submitHandler = async (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            toast.error("Passwords do not match")
            return
        }

        try {
            const res = await register({name, email, password}).unwrap()
            console.log({...res})
            dispatch(setCredentials({...res}))
            navigate('/')
        } catch(err) {
            toast.error(err?.data?.message || err.error)
        }
    }

    return (    
        <FormContainer>
            <h1> Sign Up </h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className='my-2' controlId='name'>
                    <Form.Label> Name </Form.Label>
                    <Form.Control 
                        type='text' 
                        placeholder='Enter Name' 
                        value={name} onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group className='my-2' controlId='email'>
                    <Form.Label> Email Address </Form.Label>
                    <Form.Control 
                        type='email' 
                        placeholder='Enter Email' 
                        value={email} onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                
                
                <Form.Group className='my-2' controlId='password'>
                    <Form.Label> Email Address </Form.Label>
                    <Form.Control 
                        type='password' 
                        placeholder='Enter Password' 
                        value={password} onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group className='my-2' controlId='confirmPassword'>
                    <Form.Label> Confirm Password </Form.Label>
                    <Form.Control 
                        type='password' 
                        placeholder='Confirm Password' 
                        value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                {isLoading && <Loader/>}

                <Button type='submit' variant='primary' className="mt-2"> Register </Button>

                <Row className="py-3">
                    <Col>
                        Already have an account? <Link to="/login"> Log In </Link>
                    </Col>
                </Row>
            </Form>
        </FormContainer>
    )
}

export default SignUpScreen