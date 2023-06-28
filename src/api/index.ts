import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';

const catsApiUrl = 'https://api.thecatapi.com/v1/';
const catApiKey =
  'live_i0B0DayEHTwyyAVq7QCkp2N8731JchayIn7Zf7ndj3rnkCxMRl3xGlOjvwgK67QR'; //x-api-key header

const catsApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: catsApiUrl,
    prepareHeaders: async headers => {
      headers.set('x-api-key', catApiKey);
      return headers;
    },
  }),
  endpoints: () => ({}),
  reducerPath: 'catsApi',
});

export { catsApi };
