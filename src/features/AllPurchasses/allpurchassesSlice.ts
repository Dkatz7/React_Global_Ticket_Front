import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { getPurchasses } from './allPurchassesAPI';
import Purchasses from '../../models/purchasses';

export interface allPurchassesState {

  status: "idle" | "loading" | "failed" | "success"
  purchasses: Purchasses[]
};

const initialState: allPurchassesState = {
  status: 'idle',
  purchasses: []
};

export const getPurchassesAsync = createAsyncThunk(
  'allpurchasses/getallpurchasses', 
  async () => {
    const response = await getPurchasses();
    return response.data;
  }
);

export const AllPurchassesSlice = createSlice({
  name: 'allpurchasses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPurchassesAsync.fulfilled, (state, action) => {
        state.purchasses = action.payload
        state.status = 'success'
      })
  }
});

export const { } = AllPurchassesSlice.actions;
export const selectstatus = (state: RootState)=> state.allpurchasses.status
export const selectallpurchasses = (state: RootState)=> state.allpurchasses.purchasses
export default AllPurchassesSlice.reducer; 