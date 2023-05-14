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

export async function getCart(user: any) {
  const token = localStorage.getItem('authToken');
  return new Promise<{ data: any }>((resolve) =>
    axios.get(MY_SERVER + "view-cart/")
      .then((res) => resolve({ data: res.data }))
  );
}

export async function addToCart(pk: number, quantity: number) {
  // console.log(cred)
  return new Promise<{ data: any }>((resolve) =>
    axios.post(MY_SERVER + "add-to-cart/", { pk, quantity })
      .then((res) => resolve({ data: res.data }))
  );
}

export async function delFromCart(pk: number) {
  return new Promise<{ data: any }>((resolve) =>
    axios.delete(MY_SERVER + "remove-from-cart/"+ pk )
      .then((res) => resolve({ data: res.data }))
  );
}

export async function updItemCart(item:any) {
  return await axios.put(MY_SERVER+"update-order/"+ item["id"] ,item, {headers: {'content-type': 'multipart/form-data'}}).then(res => res.data)
}
