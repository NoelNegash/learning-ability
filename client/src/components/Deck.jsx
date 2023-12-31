import React from 'react';
import { setDeck, setDeckIncrement, setDeckPublic, setDeckImages } from '../slices/deckSlice';
import { useDispatch } from 'react-redux';
import { Container, Row, Col, Card, Button, Badge, Form } from 'react-bootstrap';
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

    const toggleDeckPublic = () => {
        let d = {...deck}
        d.public = !d.public;
        updateDeck(d)
        refetch();
    }

    const toggleDeckImages = () => {
        let d = {...deck}
        d.images = !d.images;
        updateDeck(d)
        refetch();
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
        <Card style={{ width: '320px', margin: '10px', display: "block" }}>
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
                <Row className='justify-content-center'>
                    <Col md={4}><Form.Check type="checkbox" label="Images" checked={deck.images} onChange={toggleDeckImages}/></Col>
                    <Col md={4}><Form.Check type="checkbox" label="Public" checked={deck.public} onChange={toggleDeckPublic}/></Col>
                </Row>
                <hr/>
                <Col>
                    <Col >
                    <Button className='m-1' onClick={() => setDeckIncrement(deck, 1)} variant={deck.increment === 1 ? 'primary' : 'secondary'} size='sm'>15 sec</Button>
                    <Button className='m-1' onClick={() => setDeckIncrement(deck, 2)} variant={deck.increment === 2 ? 'primary' : 'secondary'} size='sm'>30 sec</Button>
                    <Button className='m-1' onClick={() => setDeckIncrement(deck, 4)} variant={deck.increment === 4 ? 'primary' : 'secondary'} size='sm'>60 sec</Button>
                    <Button className='m-1' onClick={() => setDeckIncrement(deck, 6)} variant={deck.increment === 6 ? 'primary' : 'secondary'} size='sm'>1.5 min</Button>
                    </Col>
                    <Col>
                    
                    <Button className='m-1' onClick={() => setDeckIncrement(deck, 12)} variant={deck.increment === 12 ? 'primary' : 'secondary'} size='sm'>3 min (Spectrum)</Button>
                    <Button className='m-1' onClick={() => setDeckIncrement(deck, 24)} variant={deck.increment === 24 ? 'primary' : 'secondary'} size='sm'>6 min (Spectrum)</Button>
                    
                    </Col>
                </Col>
            </Card.Body>
        </Card>
    );
};

export default Deck;