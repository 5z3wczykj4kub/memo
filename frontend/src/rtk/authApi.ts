import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from './store';

export interface ICurrentUser {
  id: string | null;
  username: string | null;
  token: string | null;
}

export interface ISignUpFormValues {
  username: string;
  password: string;
  confirmedPassword: string;
}

export const authApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_AUTH_API_ENDPOINT,
    prepareHeaders: (headers, { getState }) => {
      const { token } = (getState() as RootState).auth;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    signUp: builder.mutation<ICurrentUser, ISignUpFormValues>({
      query: (credentials) => ({
        url: '/signup',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const { useSignUpMutation } = authApi;
