import axios from "axios";
import { MY_SERVER } from "../../env";

export async function loginUser(cred: any) {
  try {
    const response = await axios.post(MY_SERVER + "login/", { 
      username: cred.user, 
      password: cred.pwd 
    });
    return { data: response.data };
  } catch (error) {
    return Promise.reject(error);
  }
}

export function logoutUser() {
  return new Promise<{ data: any }>((resolve) => resolve({ data: false }));
}
