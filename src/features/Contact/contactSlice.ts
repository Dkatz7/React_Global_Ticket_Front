import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import Events from '../../models/Events';
import Images from '../../models/Images';

export interface ContactState {
  events: Events[];
}

const initialState: ContactState = {
  events: [],
}

export const ContactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    }
});

export const {  } = ContactSlice.actions;
export default ContactSlice.reducer;


