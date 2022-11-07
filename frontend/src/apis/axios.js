import axios from "axios"

const token = JSON.parse(localStorage.getItem("Token"))
const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    // Authorization: `Bearer ${token}`,
  },
  withCredentials: true,
});

export const ApiTeachingVolume = {
  Get: async (api) => {
    const tokens = JSON.parse(localStorage.getItem("Token"));
    instance.defaults.headers.common["Authorization"] = `Bearer ${tokens}`;
    const res = await instance.get(api);
    return res.data;
  },
  Post: (api, data) => {
     const tokens = JSON.parse(localStorage.getItem("Token"));
     instance.defaults.headers.common["Authorization"] = `Bearer ${tokens}`;
    return instance.post(api, data);
  },
  Update: async (api, id, data) => {
     const tokens = JSON.parse(localStorage.getItem("Token"));
     instance.defaults.headers.common["Authorization"] = `Bearer ${tokens}`;
    return await instance.put(api + id, data);
  },
  Put: async (api,  data) => {
     const tokens = JSON.parse(localStorage.getItem("Token"));
     instance.defaults.headers.common["Authorization"] = `Bearer ${tokens}`;
    return await instance.put(api, data);
  },
  Delete: async (api, id) => {
     const tokens = JSON.parse(localStorage.getItem("Token"));
     instance.defaults.headers.common["Authorization"] = `Bearer ${tokens}`;
    return await instance.delete(api + id);
  },
};