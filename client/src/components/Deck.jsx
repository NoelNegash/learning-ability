import React from 'react';
import { setDeck, setDeckIncrement } from '../slices/deckSlice';
import { useDispatch } from 'react-redux';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useUpdateDeckMutation } from '../slices/deckApiSlice';
import { toast } from 'react-hot-toast'

const Deck = ({ deck, refetch }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const editHandler = () => {
        dispatch(setDeck(deck))
        navigate('/edit')
    } 

    
    const [ updateDeck ] = useUpdateDeckMutation();

    const setDeckIncrement = (d, i) => {
        d = {...d}
        d.increment = i;
        updateDeck(d);
        refetch()
    }

    const drillHandler = () => {
        if (deck.cards.length == 0) {
            toast.error("No cards in deck")
        } else {
            dispatch(setDeck(deck))
            navigate('/quiz')
        }
    }

    return (
        <Card style={{ width: '300px', margin: '10px', display: "block" }}>
            <Card.Body>
                <Card.Title>
                <h4>{deck.name}</h4>
                </Card.Title>
                <div style={{ marginBottom: '10px' }}>
                    <Badge variant="secondary">{deck.cards.length} cards</Badge>
                </div>
                <Container className='justify-content-center d-flex'>
                    <Button variant="primary" size="lg" className="px-4 mx-2 mr-2" onClick={drillHandler}>
                        Memorize
                    </Button>
                    <Button variant="secondary" size="sm" className=" mx-2" onClick={editHandler}>
                        Edit
                    </Button>

                </Container>
                <hr/>
                <Col>
                    <Row >
                    <Button className='m-2' onClick={() => setDeckIncrement(deck, 1)} variant={deck.increment === 1 ? 'primary' : 'secondary'} size='sm'>15 sec</Button>
                    <Button className='m-2' onClick={() => setDeckIncrement(deck, 2)} variant={deck.increment === 2 ? 'primary' : 'secondary'} size='sm'>30 sec</Button>
                    <Button className='m-2' onClick={() => setDeckIncrement(deck, 4)} variant={deck.increment === 4 ? 'primary' : 'secondary'} size='sm'>60 sec</Button>
                    <Button className='m-2' onClick={() => setDeckIncrement(deck, 6)} variant={deck.increment === 6 ? 'primary' : 'secondary'} size='sm'>1.5 min</Button>
                    </Row>
                    <Row>
                    
                    <Button className='m-2' onClick={() => setDeckIncrement(deck, 12)} variant={deck.increment === 12 ? 'primary' : 'secondary'} size='sm'>3 min(Spectrum)</Button>
                    <Button className='m-2' onClick={() => setDeckIncrement(deck, 24)} variant={deck.increment === 24 ? 'primary' : 'secondary'} size='sm'>6 min(Spectrum)</Button>
                    
                    </Row>
                </Col>
            </Card.Body>
        </Card>
    );
};

export default Deck;