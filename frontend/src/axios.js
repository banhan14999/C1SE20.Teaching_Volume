import axios from "axios"
export async function  Get(api){
   const res = await axios.get(api);
   return res.data
}
export async function Post(api,data) {
    return await axios.post(api, data);
}
export function Update(api) {

}
export async function Delete(api,id) {
  return await axios.delete(api + id);
}