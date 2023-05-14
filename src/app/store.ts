import { configureStore, ThunkAction, Action, createReducer } from '@reduxjs/toolkit';
import  Eventsreducer   from '../features/Events/eventsSlice';
import  Loginreducer   from '../features/Login/loginSlice';
import Registerreducer from '../features/Register/registerSlice'
import Cartreducer from "../features/Cart/cartSlice"
import Userinforeducer from "../features/Userinfo/userinfoSlice"
import Imagesreducer from "../features/Images/imagesSlice"
import Purchassesreducer from '../features/Purchasses/purchassesSlice';
import AllUsersreducer from "../features/AllUsers/allusersSlice"
import AllPurchassesreducer from "../features/AllPurchasses/allpurchassesSlice"
import Homereducer from "../features/Home/homeSlice"
import ContactPagereducer from "../features/Contact/contactSlice"

export const store = configureStore({
  reducer: {
    events: Eventsreducer,
    login: Loginreducer,
    register: Registerreducer,
    cart: Cartreducer,
    userinfo:Userinforeducer,
    images:Imagesreducer,
    purchasses:Purchassesreducer,
    allusers:AllUsersreducer,
    allpurchasses:AllPurchassesreducer,
    home:Homereducer,
    contact:ContactPagereducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
