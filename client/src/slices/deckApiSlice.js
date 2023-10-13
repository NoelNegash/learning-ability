import { apiSlice } from './apiSlice'

const DECKS_URL = '/api/deck'

export const deckApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        decks: builder.query({
            query: (data) => `${DECKS_URL}/all`,
        }),
        newDeck: builder.mutation({
            query: (data) => ({
                url:`${DECKS_URL}/new`,
                method: 'POST',
            })
        }),
        updateDeck: builder.mutation({
            query: (data) => ({
                url:`${DECKS_URL}`,
                method: 'POST',
                body: data
            })
        })
        /*register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}`,
                method: "POST",
                body: data
            })
        }),
        logout: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/logout`,
                method: "POST",
            })
        })*/
    })
})

export const { useDecksQuery, useNewDeckMutation, useUpdateDeckMutation } = deckApiSlice;