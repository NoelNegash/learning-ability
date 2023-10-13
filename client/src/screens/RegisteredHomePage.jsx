import { useDecksQuery, useNewDeckMutation, useUpdateDeckMutation } from "../slices/deckApiSlice"
import { Row, Col, Container, Button, Card } from "react-bootstrap"
import Loader from '../components/Loader'
import Deck from "../components/Deck"
import { useEffect } from "react"
import logo from '../logo.jpeg'

const RegisteredHomePage = () => {
    const {data: decks, isLoading, refetch} = useDecksQuery()
    const [newDeck] = useNewDeckMutation()

    useEffect(() => {
        if (refetch) refetch()
    }, [refetch]);

    const newDeckHandler = async () => {
        await newDeck()
        refetch()
    }

    return (
        <Container className='my-5'>
            <Container className='d-flex justify-content-center mb-2'>

                <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
                    <img src={logo} alt='logo' height='100px' className='mb-1'></img>
                    <p className="text-center mb-4">
                        The best working memory system to study for all your memorization needs.
                    </p>

                </Card>
            </Container>
                
            <h2> Your Definition Lists </h2>
            <Row>
                {isLoading ? <Loader/> : 
                    decks.map((deck, index) => 
                        <Col md={3}><Deck key={index+1} refetch={refetch} deck={deck}/></Col>
                    )
                }
                <Col key={0} md={3} className="d-flex">
                    <Container className='d-flex align-items-center'>
                        <Button onClick={newDeckHandler} className='m-auto'>
                            Add New Definition List
                        </Button>
                    </Container>
                </Col>
            </Row>
        </Container>
    )
}

export default RegisteredHomePage