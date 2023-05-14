import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import Events from '../../models/Events';
import Images from '../../models/Images';
import { addEvent, delEvent, getEvent, getEvents, updEvent } from '../Events/eventsAPI';

export interface HomeState {
  images: Images[]
  events: Events[];
}

const initialState: HomeState = {
  events: [],
  images: []
}


export const HomeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    }
});

export const {  } = HomeSlice.actions;
export default HomeSlice.reducer;


