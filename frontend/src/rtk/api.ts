import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from './store';
import {
  IAuthenticateFormValues,
  ICurrentUser,
  IGameResults,
  IGameResultsPayload,
  IUserProfile,
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
    updateUserExperience: builder.mutation<IGameResults, IGameResultsPayload>({
      query: (gameResults) => ({
        url: '/me',
        method: 'PUT',
        body: gameResults,
      }),
    }),
    getUserById: builder.query<IUserProfile, string>({
      query: (userId) => ({
        url: `/users/${userId}`,
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
  useGetUserByIdQuery,
} = api;
