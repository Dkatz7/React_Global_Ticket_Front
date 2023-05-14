import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { getUsers, delUser,  } from './allusersAPI';
import { ToastContainer, toast } from 'react-toastify';
import Users from '../../models/Users';

export interface allUsersState {

  status: "idle" | "loading" | "failed" | "success"
  users: Users[]
};

const initialState: allUsersState = {
  status: 'idle',
  users: []
};

export const getUsersAsync = createAsyncThunk(
  'users/getusers', 
  async (tmploggedUser: string) => {
    const response = await getUsers();
    return response.data;
  }
);

export const delUserAsync = createAsyncThunk(
  'users/deluser',
  async (itemid: number) => {
    const response = await delUser(itemid);
    return response.data;
  }
)

const toastDelete = () => toast.warn(`You deleted one event from your cart!`, {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
});

export const AllUsersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsersAsync.fulfilled, (state, action) => {
        state.users = action.payload
        state.status = 'success'
      })
      .addCase(delUserAsync.fulfilled, (state, action) => {
        state.users = state.users.filter(x => x.id !== action.payload)
        toastDelete()
      })
  }
});

export const { } = AllUsersSlice.actions;
export const selectstatus = (state: RootState)=> state.allusers.status
export const selectallusers = (state: RootState)=> state.allusers.users
export default AllUsersSlice.reducer;