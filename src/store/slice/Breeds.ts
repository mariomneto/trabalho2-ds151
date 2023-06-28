import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../../model/User';
import { CatBreedNameId } from '../../model/CatBreed';

const initialState: CatBreedNameId[] = [];

const breeds = createSlice({
  name: 'breeds',
  initialState,
  reducers: {
    resetBreeds: state => {
      state = [];
    },
    setBreeds: (state, action: PayloadAction<CatBreedNameId[]>) => {
      state = action.payload;
    },
  },
});

export const { resetBreeds, setBreeds } = breeds.actions;

export default breeds.reducer;
