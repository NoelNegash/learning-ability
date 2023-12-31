import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Form, Button } from 'react-bootstrap';
import { BsPlusCircle, BsTrash } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { useUpdateDeckMutation } from '../slices/deckApiSlice';
import { setDeckName, setCardTerm, setCardDescription, setCardImage, deleteCard, addCard } from '../slices/deckSlice';
import { toast } from 'react-hot-toast';
import { SERVER_NAME } from '../slices/apiSlice';

import Loader from '../components/Loader';

const EditQuiz = () => {
    
    const dispatch = useDispatch()

    const [updateDeck] = useUpdateDeckMutation()

    const { deck } = useSelector((state) => state.deck)
    const [generationPrompt, setGenerationPrompt] = useState('')
    const [generatedCards, setGeneratedCards] = useState(null)

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

    const handleAddCard = async (card=null) => {
        if (deck.cards.length < 150) dispatch(addCard({card:card}))
        else toast.error("Can't add more than 150 cards")
        
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
                const response = await fetch(SERVER_NAME+'/image', {
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
                    {deck.images && <th>Image</th>}
                    <th>Term</th>
                    <th>Description</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {deck.cards.length > 0 ? deck.cards.map((card, index) => (
                    <tr key={index}>
                    { deck.images && 
                        <td onDrop={(event) => handleImageDrop(index, event)} onDragOver={handleDragOver}>
                            {card.image ? (
                            <img src={SERVER_NAME + card.image} alt="Card" width="64" height="64" />
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
                        </td>}
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
            
            <Button variant="primary" onClick={()=>handleAddCard()}>
                Add New Definition
            </Button>
            <h3 className='mt-5 mb-2'>
                Generate Cards With AI
            </h3>
            <Col className='d-flex my-3'>
                <Form.Control type='textarea' placeholder='Enter prompt . . .' value={generationPrompt} onChange={(e) => setGenerationPrompt(e.target.value)}></Form.Control>
                <Button onClick={() => {
                    if (generationPrompt !== '') {
                        setGeneratedCards([{term:"Hello", description:"World"},{term:"Hello", description:"World"},{term:"Hello", description:"World"},{term:"Hello", description:"World"}])
                        setGenerationPrompt('');
                    }
                }}>Generate</Button>
            </Col>

            {generatedCards && generatedCards.length > 0 &&
            <Table className='bordered cards-table'>
                <thead>
                <tr>
                    <th>Term</th>
                    <th>Description</th>
                    <th></th>
                </tr>
                </thead>

                <tbody>
                {generatedCards.map((card, index) => (
                    <tr key={index}>
                    <td>
                        <Form.Control
                        type="text"
                        value={card.term}
                        onChange={(event) => (e) => {
                            card.term = e.target.value
                            setGeneratedCards([...generatedCards])
                        }}
                        style={{ backgroundColor: 'whitesmoke', height: "auto" }}
                        />
                    </td>
                    <td>
                        <Form.Control
                        as="textarea"
                        value={card.description}
                        onChange={(event) => (e) => {
                            card.description = e.target.value
                            setGeneratedCards([...generatedCards])
                        }}
                        style={{ backgroundColor: 'whitesmoke' }}
                        />
                    </td>
                    <td>
                        <Col className='d-flex justify-content-around'>
                            <BsPlusCircle
                            size={20} 
                            onClick={() => {
                                var card = generatedCards.splice(index,1)[0];
                                setGeneratedCards([...generatedCards])
                                handleAddCard(card)
                            }}
                            style={{ cursor: 'pointer' }}/>
                            <BsTrash
                            size={20}
                            onClick={() => {
                                generatedCards.splice(index,1)
                                setGeneratedCards([...generatedCards])
                            }}
                            style={{ cursor: 'pointer' }}
                            />
                        </Col>
                    </td>
                    </tr>
                ))}
                </tbody>    
            </Table>}
            </Col>
        </Row>
        </Container> : 
        <Loader/>
        }
        </Container>
    );
};

export default EditQuiz;