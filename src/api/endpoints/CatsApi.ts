import { catsApi } from '..';
import { CatBreedNameId } from '../../model/CatBreed';
import { CatImage } from '../../model/CatImage';
import { CatImageReq } from '../../model/CatImageReq';

//queries rtk: sao injetados endpoints da api catsApi, e as funcoes exportadas (useLazy) possibilitam acessar
//o retorno da querie em um objeto separado que pode ser usado no useEffect
export const appointmentApi = catsApi.injectEndpoints({
  endpoints: builder => ({
    //raças de gatos
    getCatBreedIds: builder.query<CatBreedNameId[], void>({
      query: () => ({
        method: 'GET',
        url: `breeds`,
      }),
    }),
    //imagens
    //sao usados os parametros de limit (maximo de imagens desejadas), categorias e raças (string com lista de ids)
    getCatImages: builder.query<CatImage[], CatImageReq>({
      query: payload => {
        const limitQuery = payload.limit ? `limit=${payload.limit}&` : '';
        const categoriesQuery = payload.categories
          ? `category_ids=${payload.categories}&`
          : '';
        const breedsQuery = payload.breeds
          ? `breed_ids=${payload.categories}&`
          : '';
        return {
          method: 'GET',
          url: `images/search?${limitQuery}${categoriesQuery}${breedsQuery}`,
        };
      },
    }),
  }),
});

export const { useLazyGetCatBreedIdsQuery, useLazyGetCatImagesQuery } =
  appointmentApi;
