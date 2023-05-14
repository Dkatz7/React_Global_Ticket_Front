import axios from "axios";
import { MY_SERVER } from "../../env";
import Images from "../../models/Images";
import Userinformation from "../../models/UserInformation";



export async function getimages() {
  return new Promise < {data: any} > ((resolve) =>
    axios.get(MY_SERVER + "images/",{
      headers: {
        Authorization: ""
      }})
      .then((res) => resolve({ data:res.data }))
  );
}

export async function getimage(id:number) {
  return new Promise < {data: any} > ((resolve) =>
    axios.get(MY_SERVER + "images/"+id, {
      headers: {
        Authorization: ""
  }})
      .then((res) => resolve({ data:res.data }))
  );
}

export async function addimage(image:Images) {
  console.log(image)
  try {
    const response = await axios.post(
      `${MY_SERVER}images/`,
      image, {headers: {'content-type': 'multipart/form-data'}}
    );
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updimage(image:Images,id:number) {
  try {
    const response = await axios.put(
      `${MY_SERVER}images/`+id,
      image,{headers: {'content-type': 'multipart/form-data'}}
    );
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function delimage(id:number) {
  return await axios.delete(MY_SERVER+"images/"+id).then (res => id);
}
