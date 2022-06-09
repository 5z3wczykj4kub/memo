import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from './store';
import { ICurrentUser, IAuthenticateFormValues } from './types';

export const authApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_AUTH_API_ENDPOINT,
    prepareHeaders: (headers, { getState }) => {
      const token =
        (getState() as RootState).auth.token || localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    signUp: builder.mutation<ICurrentUser, IAuthenticateFormValues>({
      query: (credentials) => ({
        url: '/signup',
        method: 'POST',
        body: credentials,
      }),
    }),
    signIn: builder.mutation<ICurrentUser, IAuthenticateFormValues>({
      query: (credentials) => ({
        url: '/signin',
        method: 'POST',
        body: credentials,
      }),
    }),
    getCurrentUser: builder.query<ICurrentUser, void>({
      query: () => ({
        url: '/me',
      }),
    }),
  }),
});

export const { useSignUpMutation, useSignInMutation } = authApi;
