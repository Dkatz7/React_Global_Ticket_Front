import Events from "../../models/Events";
import axios from "axios";
import { MY_SERVER } from "../../env";



export async function addEvent(ev:Events) {
  try {
    const response = await axios.post(
      `${MY_SERVER}manage_events/`,
      ev,{headers: {'content-type': 'multipart/form-data'}}
    );
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function  getEvent(evId:number) {
  return await axios.get(MY_SERVER+"events/"+evId, {
    headers: {
      Authorization: ""
}}).then(res => res )
}

export async function  getEvents() {
  return await axios.get(MY_SERVER+"events/", {
    headers: {
      Authorization: ""
}}).then(res => res );
}


export async function delEvent(id:number) {
  return await axios.delete(MY_SERVER+"manage_events/"+id).then (res => id);
}

export async function updEvent(ev:Events) {
  console.log(ev)
  return await axios.put(MY_SERVER+"manage_events/"+ ev.id, ev, {headers: {'content-type': 'multipart/form-data'}}).then(res => res.data)
}