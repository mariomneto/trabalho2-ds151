import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';

const catsApiUrl = 'https://api.thecatapi.com/v1/';
const crudApiUrl = 'https://crudapi.co.uk/api/v1/';
const crudApiKey = 'hWyqICU4CpHu-_wxOEQjMxztK86zJPUjPC4Ph93WIZS2sgv8Jg'; //Bearer token header
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

const crudApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: crudApiUrl,
    prepareHeaders: async headers => {
      headers.set('Authorization', `Bearer ${crudApiKey}`);
      return headers;
    },
  }),
  endpoints: () => ({}),
  reducerPath: 'catsApi',
});

export { catsApi, crudApi };
