import axios from "axios"
export async function  Get(api){
   const res = await axios.get("http://127.0.0.1:8000/api" + api);
   return res.data
}
export async function Post(api,data) {
    return await axios.post("http://127.0.0.1:8000/api" + api, data);
}
export async function Update(api,id,data) {
    return await axios.put("http://127.0.0.1:8000/api" + api+id, data );
}
export async function Delete(api,id) {
  return await axios.delete("http://127.0.0.1:8000/api" + api + id);
}