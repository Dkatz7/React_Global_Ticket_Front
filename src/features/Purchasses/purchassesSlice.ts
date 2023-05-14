import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import Purchasses from "../../models/purchasses"
import { selectTmploggedUser } from '../Login/loginSlice';
import { useAppSelector } from '../../app/hooks';
import { getPurchasses, makeOrder } from './purchassesAPI';
import Cart from '../../models/Cart';
import { getCartAsync } from '../Cart/cartSlice';

export interface PurchassesState {
  statuspurchasses: "idle" | "loading" | "failed" | "success"
  logged: boolean
  tmploggedUser: string
  purchassesList: Purchasses[]
  cartItems: Cart[]
};

const initialState: PurchassesState = {
  logged: false,
  tmploggedUser: '',
  statuspurchasses: 'idle',
  purchassesList: [],
  cartItems: []
};


export const getPurchassesAsync = createAsyncThunk(
  'purchasses/getpurchasses',
  async (selectTmploggedUser: string) => {
    const response = await getPurchasses(selectTmploggedUser);
    return response.data;

  }
);


export const makeOrderAsync = createAsyncThunk(
  'cart/makeorder',
  async (cart:any) => {
    // console.log(id, quantity)
    const response = await makeOrder(cart);
    return response.data;
  }
);

export const PurchassesSlice = createSlice({
  name: 'purchasses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPurchassesAsync.fulfilled, (state, action) => {
        state.purchassesList = action.payload
        state.statuspurchasses = 'idle'
      })
      .addCase(makeOrderAsync.fulfilled, (state, action)=>{
        state.cartItems=[]
        state.statuspurchasses = "success"
        getCartAsync(state.tmploggedUser)
      })
  }
});



export const { } = PurchassesSlice.actions;
export const selectstatuspurchasses = (state: RootState)=> state.purchasses.statuspurchasses
export const selectpurchasseslist = (state: RootState)=> state.purchasses.purchassesList
export default PurchassesSlice.reducer;



