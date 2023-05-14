import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { loginUser, logoutUser } from './loginAPI';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCartAsync } from '../Cart/cartSlice';

export interface LoginState {
  logged: boolean
  loggedUser: string
  tmploggedUser: string
  isAdmin: boolean
  userid:number
  status: "idle" | "failed" | "success"
};

const initialState: LoginState = {
  logged: false,
  loggedUser: "",
  tmploggedUser: '',
  isAdmin: false,
  userid: 0,
  status: 'idle'
};

export const loginAsync = createAsyncThunk(
  'login/loginuser',
  async (cred: any) => {
    const response = await loginUser(cred);
    return response;
  }
);

export const logoutasync = createAsyncThunk(
  'login/logoutUser',
  async () => {
    const response = await logoutUser();
    return response;
  }
);

const toastLogout = () => toast.info("You are logged out!", {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: 1,
  theme: "dark",
});

export const LoginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.logged = true;
        const { access, refresh, is_admin} = action.payload.data;
        const jwt = require('jsonwebtoken');
        localStorage.setItem('access_token', access);
        localStorage.setItem('refresh_token', refresh);  
        const decodedToken = jwt.decode(access);
        state.tmploggedUser = decodedToken.username
        state.userid=decodedToken.user_id
        localStorage.setItem('authToken', access);
        state.status="success"
        getCartAsync(state.tmploggedUser)
        if (decodedToken.is_admin) {
          state.isAdmin = true
        }
        else {
          state.isAdmin = false
        }
      })
      .addCase(loginAsync.rejected, (state,action)=>{
        state.status="failed"
      })
      .addCase(logoutasync.fulfilled, (state, action) => {
        state.logged = false;
        state.isAdmin= false;
        state.tmploggedUser ="";
        state.loggedUser ="";
        state.status="idle";
        state.userid=0
        localStorage.setItem('access_token', "");
        localStorage.setItem('refresh_token', "");  
        toastLogout();
      });
  },
});

export const { } = LoginSlice.actions;
export const selectLogged = (state: RootState) => state.login.logged
export const selectIsAdmin = (state: RootState) => state.login.isAdmin
export const selectUserId = (state: RootState) => state.login.userid
export default LoginSlice.reducer;
export const selectTmploggedUser = (state: RootState) => state.login.tmploggedUser
export const selectloginstatus =(state: RootState) => state.login.status