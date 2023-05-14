import axios from "axios";
import { MY_SERVER } from "../../env";
import Cart from "../../models/Cart";

export async function getUsers() {
  return new Promise<{ data: any }>((resolve) =>
    axios.get(MY_SERVER + "all_users/")
      .then((res) => resolve({ data: res.data }))
  );
}

export async function delUser(pk: number) {
  return new Promise<{ data: any }>((resolve) =>
    axios.delete(MY_SERVER + "remove-from-cart/"+ pk )
      .then((res) => resolve({ data: res.data }))
  );
}
