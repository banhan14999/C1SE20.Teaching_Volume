import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});
const apps = () => {
  const token = JSON.parse(localStorage.getItem("Token"));
  instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};
export const ApiTeachingVolume = {
  Get: async (api) => {
    apps();
    const res = await instance.get(api);
    return res.data;
  },
  Post: (api, data) => {
    apps();
    return instance.post(api, data);
  },
  Update: async (api, id, data) => {
    apps();
    return await instance.put(api + id, data);
  },
  Put: async (api, data) => {
    apps();
    return await instance.put(api, data);
  },
  Delete: async (api, id) => {
    apps();
    return await instance.delete(api + id);
  },
};
