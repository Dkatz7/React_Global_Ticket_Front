import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import Events from '../../models/Events';
import { addEvent, delEvent, getEvent, getEvents, updEvent } from '../Events/eventsAPI';

export interface EventsState {
  upcomingEvents: any;
  selectedEvent: any;
  events: Events[];
}

const initialState: EventsState = {
  events: [],
  selectedEvent: undefined,
  upcomingEvents: undefined
}

export const getEventAsync = createAsyncThunk(
  'events/getEvents',
  async (evId:number) => {
    const response = await getEvent(evId);
    // console.log(evId)
    return response.data;

  }
);

export const getEventsAsync = createAsyncThunk(
  'events/getEvents',
  async () => {
    const response = await getEvents();
    return response.data;
  }
);
export const selectEventByIdAsync = createAsyncThunk(
  'events/selectEventById',
  async (evId: number) => {
    const response = await getEvent(evId);
    // console.log(response.data)
    return response.data;
  }
);

export const addEventAsync = createAsyncThunk(
  'events/addEvent',
  async (event: Events) => {
    console.log(event)
    const response = await addEvent(event);
    return response;
  }
);

export const delEventAsync = createAsyncThunk(
  'event/delEvent',
  async (id: number) => {
    const response = await delEvent(id);
    return response;
  }
);

export const updEventAsync = createAsyncThunk(
  'event/updEvent',
  async (ev: Events) => {
    const formattedDate = ev.date_and_time.toString().slice(0, 19).replace('T', ' ');
    const updatedEvent: Events = {
      ...ev,
      date_and_time: formattedDate
    };
    const response = await updEvent(updatedEvent);
    return response;
  }
);

export const EventsSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addEventAsync.fulfilled, (state, action) => {
        // console.log(action.payload)
        state.events.push(action.payload);
      })
      .addCase(selectEventByIdAsync.fulfilled, (state, action) => {
        // console.log(action.payload)
        state.selectedEvent = action.payload;
      })
      .addCase(getEventsAsync.fulfilled, (state, action) => {
        state.events = action.payload;
      })
      .addCase(delEventAsync.fulfilled, (state, action) => {
        state.events = state.events.filter(x => x.id !== action.payload)

      }).addCase(updEventAsync.fulfilled, (state, action) => {
        // console.log(action.payload)
        const updatedEvent = {
          id: action.payload.id,
          date_and_time: action.payload.date_and_time,
          description: action.payload.description,
          event_name: action.payload.event_name,
          image: action.payload.image,
          location: action.payload.location,
          price: action.payload.price,
          quantity: action.payload.quantity,
        };  
        let temp = state.events.filter(x => x.id === action.payload.id)[0];
        Object.assign(temp, updatedEvent);
      
      });
    }
});

export const {  } = EventsSlice.actions;
export const selectEvents = (state: RootState) => state.events.events;
export default EventsSlice.reducer;
export const selectEvent = (state: RootState, eventId: number) => state.events.selectedEvent;


