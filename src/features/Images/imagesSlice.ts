import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import Images from '../../models/Images';
import { addimage, delimage, getimage, getimages, updimage } from './imagesAPI';

export interface imagesState {
  images: Images[]
  status: 'loading' | 'finished' | 'error' | 'idle'
};



const initialState: imagesState = {
  images: [],
  status: 'idle'
};


export const getImagesAsync = createAsyncThunk(
  'images/getimages',
  async () => {
    const response = await getimages();
    return response;
  }
);

export const addImageAsync = createAsyncThunk(
  'images/addimage',
  async (image:Images)=>{
    // console.log(image)
    console.log(image)
    const response = await addimage(image) 
    console.log(response)
    // console.log(response)
    return response
  }
)

export const getImagesByIdAsync = createAsyncThunk(
  'images/getimage',
  async (id:number) => {
    const response = await getimage(id);
    return response;
  }
);

export const uduImageAsync = createAsyncThunk(
  'images/udimage',
  async (image:Images)=>{
    const id=image.id||(-1)
    const response = await updimage(image,id) 
    // console.log(response)
    return response
  }
)

export const delImageAsync = createAsyncThunk(
  'images/delimage',
  async (id:number)=>{
    const response = await delimage(id) 
    // console.log(response)
    return response
  }
)

export const ImagesSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getImagesAsync.fulfilled, (state, action) => {
        state.images = action.payload.data 
        })
        .addCase(addImageAsync.fulfilled,(state, action)=> {
          state.images.push(action.payload)
        })
        .addCase(delImageAsync.fulfilled,(state, action)=>{
          state.images = state.images.filter(x=> x.id !==action.payload)
        })
      }});

export const { } = ImagesSlice.actions;
export const selectImages = (state: RootState) => state.images.images
export default ImagesSlice.reducer;



