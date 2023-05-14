import axios from "axios";
import { MY_SERVER } from "../../env";
import Userinformation from "../../models/UserInformation";



export async function getuserinfo() {
  // console.log(cred)
  return new Promise < {data: any} > ((resolve) =>
    axios.get(MY_SERVER + "addinfo/")
      .then((res) => resolve({ data:res.data }))
  );
}

export async function adduserinfo(infouser:Userinformation) {
  try {
    const response = await axios.post(
      `${MY_SERVER}addinfo/`,
      infouser,{headers: {'content-type': 'multipart/form-data'}}
    );
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function uduserinfo(infouser:Userinformation,id:number) {
  try {
    const response = await axios.put(
      `${MY_SERVER}addinfo/`+id,
      infouser,{headers: {'content-type': 'multipart/form-data'}}
    );
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deluserinfo(id:number) {
  try {
    const response = await axios.delete(
      `${MY_SERVER}addinfo/`+id,
    );
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}