import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { addToCart, getCart, delFromCart, updItemCart } from './cartAPI';
import Cart from "../../models/Cart"
import { ToastContainer, toast } from 'react-toastify';

export interface cartState {
  value: number
  status: "idle" | "loading" | "failed" | "success"
  logged: boolean
  tmploggedUser: string
  cartItems: Cart[]
};

interface UpdTickesQuantityAsyncArgs {
  id: number;
  quantity: number;
}

const initialState: cartState = {
  logged: false,
  tmploggedUser: '',
  value: 0,
  status: 'idle',
  cartItems: []
};

export const getCartAsync = createAsyncThunk(
  'cart/gercart', 
  async (tmploggedUser: string) => {
    const response = await getCart(tmploggedUser);
    return response.data;
  }
);

export const addToCartAsync = createAsyncThunk(
  'cart/addtocart',
  async ({ itemid, quantity }: { itemid: number, quantity: number }) => {
    const response = await addToCart(itemid, Number(quantity));
    return response.data;
  }
);

export const delFromCartAsync = createAsyncThunk(
  'cart/delfromcart',
  async (itemid: number) => {
    const response = await delFromCart(itemid);
    return response.data;
  }
)

export const updTickesQuantityAsync = createAsyncThunk(
  'cart/updticketsquantity',
  async ({ id, quantity }: UpdTickesQuantityAsyncArgs) => {
    // console.log(id, quantity)
    let item = { "id": id, "quantity": quantity }
    const response = await updItemCart(item);
    return response.data;
  }
);

const toastSuccess = (quantity: number) => toast.success(`You added ${quantity} Tickets to your cart!`, {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
});

const toastDelete = () => toast.warn(`You deleted one event from your cart!`, {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
});

const toastUpdate = (quantity:number) => toast.info(`You updated the number of tickets to: ${quantity}!`, {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
});

export const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCartAsync.fulfilled, (state, action) => {
        state.cartItems = action.payload
        state.status = 'idle'
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.cartItems.push(action.payload)
        toastSuccess(action.meta.arg.quantity)
      })
      .addCase(delFromCartAsync.fulfilled, (state, action) => {
        state.cartItems = state.cartItems.filter(x => x.id !== action.payload)
        toastDelete()
      })
      .addCase(updTickesQuantityAsync.fulfilled, (state, action) => {
        let id = action.meta.arg.id
        const updateditem = {
          id: action.meta.arg.id,
          quantity: action.meta.arg.quantity
        }
        let temp = state.cartItems.find(x => x.id === action.meta.arg.id)
        if (temp) {
          Object.assign(temp, updateditem)
          getCartAsync(state.tmploggedUser)
        }
        toastUpdate(action.meta.arg.quantity)
      })
  }
});

export const { } = CartSlice.actions;
export const selectcartitems = (state: RootState) => state.cart.cartItems
export const selectstatus = (state: RootState)=> state.cart.status
export default CartSlice.reducer;