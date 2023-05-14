import axios from "axios";
import { MY_SERVER } from "../../env";

export async function getPurchasses() {
  return new Promise<{ data: any }>((resolve) =>
    axios.get(MY_SERVER + "allpurchases/")
      .then((res) => resolve({ data: res.data }))
  );
}
