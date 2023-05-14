import axios from "axios";
import { MY_SERVER } from "../../env";

export async function registerUser(cred: any) {
  try {
  const response = await axios.post(MY_SERVER + "register/",{
    username: cred.user,
    password: cred.pwd,
    email: cred.email
  });
  return { data: response.data };
} catch (error) {
  return Promise.reject(error);
}
}