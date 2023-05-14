import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { registerUser  } from './registerAPI';

export interface registerState {
  logged: boolean
  tmploggedUser: string
  registercompleted: boolean
  status: "idle" | "success" | "faild"
};



const initialState: registerState = {
  logged: false,
  tmploggedUser: '',
  registercompleted: false,
  status: 'idle'
};


export const registerAsync = createAsyncThunk(
  'register/registeruser',
  async (cred: any) => {
    const response = await registerUser(cred);
    return response;

  }
);

export const LoginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerAsync.fulfilled, (state, action) => {
        // console.log(action.payload)
        state.registercompleted=true
        // console.log(state.registercompleted)
        state.status = "success"
        })
        .addCase(registerAsync.rejected, (state, action)=>{
          state.status = "faild"
        })
      }});

export const { } = LoginSlice.actions;
export const selectLogged = (state: RootState) => state.login.logged
export const selectRegistercompleted = (state: RootState) => state.register.registercompleted
export const selectRegisterstatus = (state: RootState) => state.register.status
export default LoginSlice.reducer;



