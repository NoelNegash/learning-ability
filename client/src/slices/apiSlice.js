import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const SERVER_NAME = process.env.REACT_APP_ENV === "dev" ? "https://localhost" : ''
const baseQuery = fetchBaseQuery({ baseUrl: SERVER_NAME, credentials: 'include' })
console.log(process.env)

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['User', 'Deck'],
    endpoints: (builder) => ({

    })
})