import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (body: { email: string; password: string }) => {
        return {
          url: '/api/auth/login',
          method: 'POST',
          body,
        };
      },
    }),
    registerUser: builder.mutation({
      query: (body: {
        name: string;
        email: string;
        password: string;
        address: {
          street: string;
          apartment?: string;
          city: string;
          state: string;
          zipCode: string;
        };
        phoneNumber?: string;
      }) => {
        return {
          url: '/api/auth/register',
          method: 'POST',
          body,
        };
      },
    }),
    
  }),
});

export const { useLoginUserMutation, useRegisterUserMutation } = authApi;
