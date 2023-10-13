import { useDecksQuery, useNewDeckMutation, useUpdateDeckMutation } from "../slices/deckApiSlice"
import { Row, Col, Container, Button } from "react-bootstrap"
import Loader from '../components/Loader'
import Deck from "../components/Deck"
import { useEffect } from "react"

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