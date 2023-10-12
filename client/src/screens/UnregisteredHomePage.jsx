import { Button, Card, Container } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"

const UnregisteredHomePage = () => {
    return (
        <div className='py-5'>
            <Container className='d-flex justify-content-center'>
                <Card className="p-5 d-flex flex-column align-items-center hero-card bg-light w-75">
                    <h1 className="text-center mb-4"> A Learning Ability </h1>
                    <p className="text-center mb-4">
                        The best flash card system for all your learning needs.
                    </p>
                    <div className="d-flex">
                        <LinkContainer to="/login">
                            <Button variant='primary' className="me-3">
                                Log In
                            </Button>
                        </LinkContainer>
                        
                        <LinkContainer to='/signup'>
                            <Button variant='primary' href='/signup'>
                                Sign Up
                            </Button>
                        </LinkContainer>
                    </div>
                </Card>
            </Container>
        </div>
    )
}

export default UnregisteredHomePage