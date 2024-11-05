import axios from "axios";

import { getAuthHeaders, getAuthHeadersForUsers } from "./authHelper";

export const getRequest = async (url, params = {}) => {
  const data = await axios.get(url, { params, headers: getAuthHeaders() });
  return data;
};

export const postRequest = async (url, payload) => {
  const data = url.includes("users")
    ? await axios.post(url, payload, { headers: getAuthHeadersForUsers() })
    : await axios.post(url, payload, { headers: getAuthHeaders() });
  return data;
};

export const putRequest = async (url, payload) => {
  const data = await axios.put(url, payload, { headers: getAuthHeaders() });
  return data;
};

export const patchRequest = async (url, payload) => {
  const data = await axios.patch(url, payload, { headers: getAuthHeaders() });
  return data;
};


export const deleteRequest = async (url) => {
  const data = await axios.delete(url, { headers: getAuthHeaders() });
  return data;

  
};
