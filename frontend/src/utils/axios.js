import axios from "axios"
const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});
export async function  Get(api){
   const res = await instance.get(api);
   return res.data
}
export async function Post(api,data) {
    return await instance.post(api, data);
}
export async function Update(api,id,data) {
    return await instance.put(api + id, data);
}
export async function Delete(api,id) {
  return await instance.delete(api + id);
}