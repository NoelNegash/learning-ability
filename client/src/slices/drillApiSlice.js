import { apiSlice } from './apiSlice'

const DRILLS_URL = '/api/drill'

export const drillApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        newDrill: builder.mutation({
            query: (data) => ({
                url:`${DRILLS_URL}`,
                method: 'POST',
                body: data
            })
        }),
        drills: builder.query({
            query: (data) => `${DRILLS_URL}/all?deck=${data.deck}`,
        })
    })
})

export const { useDrillsQuery, useNewDrillMutation } = drillApiSlice;