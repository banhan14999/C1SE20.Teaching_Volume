import axios from "axios"
const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  headers: { "Content-Type": "application/json" },
});

export const ApiTeachingVolume = {
  Get: async (api) => {
    const res = await instance.get(api);
   return res.data
  },
  Post: async (api,data)=>{
    
    return await instance.post(api, data);
  },
  Update: async (api,id,data)=>{
    return await instance.put(api + id, data);
  },
  Delete: async (api,id)=>{
    return await instance.delete(api + id);
  }
};