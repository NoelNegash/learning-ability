import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    deck: null
}

const deckSlice =  createSlice({
    name: 'deck',
    initialState,
    reducers: {
        setDeck: (state, action) => {
            state.deck = action.payload
        },
        setDeckImages: (state, action) => {
            state.deck.images = action.payload
        },
        setDeckIncrement: (state, action) => {
            state.deck.increment = action.payload
        },
        setDeckName: (state, action) => {
            state.deck.name = action.payload
        },
        setDeckPublic: (state, action) => {
            state.deck.public = action.payload
        },
        setCardTerm: (state, action) => {
            state.deck.cards[action.payload.index].term = action.payload.term
        }, 
        setCardDescription: (state, action) => {
            state.deck.cards[action.payload.index].description = action.payload.description
        }, 
        setCardImage: (state, action) => {
            state.deck.cards[action.payload.index].image = action.payload.image
        }, 
        deleteCard: (state, action) => {
            state.deck.cards.splice(action.payload, 1)
        }, 
        addCard: (state, action) => {
            var card = action.payload.card ? action.payload.card : {image:'', term:'', description:''}
            state.deck.cards = [...state.deck.cards, card]
            console.log(state.deck.cards)
        }
    }
})

export const { setDeck, setDeckName, setCardTerm, setCardDescription, setCardImage, deleteCard, addCard, setDeckIncrement, setDeckImages, setDeckPublic } = deckSlice.actions

export default deckSlice.reducer