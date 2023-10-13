import { apiSlice } from './apiSlice'

const USERS_URL = 'http://11.183.62.50.host.secureserver.net:5000/api/user'

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/auth`,
                method: "POST",
                body: data
            })
        }),
        register: builder.mutation({
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
        })
    })
})

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } = userApiSlice;