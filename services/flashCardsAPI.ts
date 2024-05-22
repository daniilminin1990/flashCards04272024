import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const flashCardsAPI = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.flashcards.andrii.es',
    credentials: 'include',
    prepareHeaders: headers => {
      headers.append('x-auth-skip', 'true')
    },
  }),
  endpoints: () => ({}),
  tagTypes: ['Deck', 'Card'],
})