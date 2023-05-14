import axios from "axios";
import { MY_SERVER } from "../../env";
import Cart from "../../models/Cart";

axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('authToken'); // Get the token from local storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Set the token in the request header
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export async function getPurchasses(user: any) {
  const token = localStorage.getItem('authToken');
  return new Promise<{ data: any }>((resolve) =>
    axios.get(MY_SERVER + "purchases/")
      .then((res) => resolve({ data: res.data }))
  );
}
export async function makeOrder(cart:Cart) {
  return await axios.post(MY_SERVER+"place-order/", cart).then(res => res.data)
}
