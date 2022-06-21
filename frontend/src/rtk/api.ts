import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from './store';
import {
  ICurrentUser,
  IAuthenticateFormValues,
  IGameResults,
  ICurrentUserGameResults,
} from './types';

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_BASE_URL_ENDPOINT,
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
        url: '/auth/sign-up',
        method: 'POST',
        body: credentials,
      }),
    }),
    signIn: builder.mutation<ICurrentUser, IAuthenticateFormValues>({
      query: (credentials) => ({
        url: '/auth/sign-in',
        method: 'POST',
        body: credentials,
      }),
    }),
    getCurrentUser: builder.query<ICurrentUser, void>({
      query: () => ({
        url: '/me',
      }),
    }),
    updateUserExperience: builder.mutation<
      ICurrentUserGameResults,
      IGameResults
    >({
      query: (gameResults) => ({
        url: '/me',
        method: 'POST',
        body: gameResults,
      }),
    }),
  }),
});

export const selectSignUpAndSignInMutationStatus = (state: RootState) =>
  state.api.mutations.authentication?.status;

export const selectGetCurrentUserQueryStatus = (state: RootState) =>
  state.api.queries['getCurrentUser(undefined)']?.status;

export const {
  useSignUpMutation,
  useSignInMutation,
  useLazyGetCurrentUserQuery,
  useUpdateUserExperienceMutation,
} = api;
