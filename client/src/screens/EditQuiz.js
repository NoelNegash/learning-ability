import React, { useEffect } from 'react';
import { Container, Row, Col, Table, Form, Button } from 'react-bootstrap';
import { BsTrash } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { useUpdateDeckMutation } from '../slices/deckApiSlice';
import { setDeckName, setCardTerm, setCardDescription, setCardImage, deleteCard, addCard } from '../slices/deckSlice';
import { toast } from 'react-hot-toast';

import Loader from '../components/Loader';

const EditQuiz = () => {
    
    const dispatch = useDispatch()

    const [updateDeck] = useUpdateDeckMutation()

    const { deck } = useSelector((state) => state.deck)

    useEffect(() => {
        if (updateDeck) updateDeck(deck)
    }, [deck, updateDeck])

    const saveDeck = async () => {
        await updateDeck(deck)
        toast("Definition list saved")
    }

    const handleDeckNameChange = async (event) => {
        dispatch(setDeckName(event.target.value))
    };

    const handleCardTermChange = async (index, event) => {
        dispatch(setCardTerm({index, term: event.target.value}))
    };

    const handleCardDescriptionChange = async (index, event) => {
        dispatch(setCardDescription({index, description: event.target.value}));
    };

    const handleCardDelete = async (index) => {
        dispatch(deleteCard(index))
    };

    const handleAddCard = async () => {
        dispatch(addCard())
    };

    const uploadImageAndGetUrl = (img) => {

    }

    const handleImageDrop = (index, event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        const reader = new FileReader();
        
        reader.onload = async (e) => {
        
            // Create a FormData object to send the image data
            const formData = new FormData();
            formData.append('image', file);
        
            try {
                const response = await fetch('/image', {
                    method: 'POST',
                    body: formData,
                });
        
                if (response.ok) {
                    const { fileName } = await response.json();
                    dispatch(setCardImage({index, image: fileName}));
                } else {
                    console.error('Failed to upload image:', response.status);
                }
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        };

        reader.readAsDataURL(file);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    return (
        <Container>
        {deck ? 
        <Container>
        <Row>
            <Col>
            <Form>
                <Form.Group controlId="deckName">
                <Form.Label className='deck-name'> Deck Name</Form.Label>
            
                <Form.Control
                    type="text"
                    value={deck.name}
                    onChange={handleDeckNameChange}
                />
                <Button variant="primary" className='mt-3' onClick={saveDeck}>
                Save Deck
                </Button>
                </Form.Group>
            </Form>
            </Col>
        </Row>
        <Row>
            <Col>
            <Table bordered className="cards-table">
                <thead>
                <tr>
                    {/*<th>Image</th>*/}
                    <th>Term</th>
                    <th>Description</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {deck.cards.length > 0 ? deck.cards.map((card, index) => (
                    <tr key={index}>
                     {/*<td onDrop={(event) => handleImageDrop(index, event)} onDragOver={handleDragOver}>
                        {card.image ? (
                        <img src={card.image} alt="Card" width="64" height="64" />
                        ) : (
                        <div
                            style={{
                            margin:'auto',
                            width: '72px',
                            height: '72px',
                            fontSize:10,
                            border: '1px dashed #ccc',
                            textAlign: 'center',
                            lineHeight: '64px',
                            }}
                        >
                            Add Image
                        </div>
                        )}
                        </td>*/}
                    <td>
                        <Form.Control
                        type="text"
                        value={card.term}
                        onChange={(event) => handleCardTermChange(index, event)}
                        style={{ backgroundColor: 'whitesmoke', height: "auto" }}
                        />
                    </td>
                    <td>
                        <Form.Control
                        as="textarea"
                        value={card.description}
                        onChange={(event) => handleCardDescriptionChange(index, event)}
                        style={{ backgroundColor: 'whitesmoke' }}
                        />
                    </td>
                    <td>
                        <BsTrash
                        size={20}
                        onClick={() => handleCardDelete(index)}
                        style={{ cursor: 'pointer' }}
                        />
                    </td>
                    </tr>
                )):
                <tr>
                    <td colSpan='4'> No Cards</td>    
                </tr>}
                </tbody>
            </Table>
            
            <Button variant="primary" onClick={handleAddCard}>
                Add new Card
                </Button>
            </Col>
        </Row>
        </Container> : 
        <Loader/>
        }
        </Container>
    );
};

export default EditQuiz;