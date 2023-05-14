import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import UserInformation from '../../models/UserInformation';
import { adduserinfo, deluserinfo, getuserinfo, uduserinfo } from './userinfoAPI';

export interface userinfoState {
  logged: boolean
  tmploggedUser: string
  userinfo: UserInformation[]
  infocomplete: boolean
  infoid: number
};



const initialState: userinfoState = {
  logged: false,
  tmploggedUser: '',
  userinfo: [],
  infocomplete: false,
  infoid: 0
};


export const getuserinfoAsync = createAsyncThunk(
  'userinfo/userinfo',
  async () => {
    const response = await getuserinfo();
    return response;
  }
);

export const adduserinfoAsync = createAsyncThunk(
  'userinfo/adduserinfo',
  async (infouser: UserInformation) => {
    // console.log(infouser)
    const response = await adduserinfo(infouser)
    // console.log(response)
    return response
  }
)

export const uduserinfoAsync = createAsyncThunk(
  'userinfo/uduserinfo',
  async (infouser: UserInformation) => {
    const id = infouser.user || (-1)
    const response = await uduserinfo(infouser, id)
    // console.log(response)
    return response
  }
)

export const deluserinfoAsync = createAsyncThunk(
  'userinfo/deluserinfo',
  async (infoid: number) => {
    console.log(infoid)
    const response = await deluserinfo(infoid)
    // console.log(response)
    return response
  }
)

export const UserinfoSlice = createSlice({
  name: 'userinfo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getuserinfoAsync.fulfilled, (state, action) => {
        state.userinfo = action.payload.data
        try {
          state.infoid = action.payload.data[0].id
        }
        catch
        { console.log("no info yet") }
        console.log(state.infoid)
      })
      .addCase(adduserinfoAsync.fulfilled, (state, action) => {
        // console.log(action.payload)
        state.infocomplete = true
        state.userinfo = action.payload
      })
      .addCase(uduserinfoAsync.fulfilled, (state, action) => {
        // console.log(action.payload)
        state.userinfo = action.payload
      })
      .addCase(deluserinfoAsync.fulfilled, (state, action) => {
        // console.log(action.payload)
        state.userinfo = []
        state.infocomplete = false
      })
  }
});

export const { } = UserinfoSlice.actions;
export const selectUserinfo = (state: RootState) => state.userinfo.userinfo
export const selectInfocompleted = (state: RootState) => state.userinfo.infocomplete
export const selectInfoId = (state: RootState) => state.userinfo.infoid
export default UserinfoSlice.reducer;



