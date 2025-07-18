import axios from "axios";

const BASE_URL = "http://localhost:8080/api/member";

export const loginUser = async (username, password) => {
  const res = await axios.post(`${BASE_URL}/login`, { username, password });
  return res.data;
};

export const registerUser = async (user) => {
  const res = await axios.post(`${BASE_URL}/register`, user);
  return res.data;
};

export const getUserInfo = async (token) => {
  const res = await axios.get(`${BASE_URL}/info`, {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
  });
  return res.data;
};

// member.js
export const logoutUser = async (token) => {
  const res = await axios.post(
    `${BASE_URL}/logout`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    }
  );
  return res.data;
};

export const updateUser = async (user, token) => {
  const res = await axios.put(`${BASE_URL}/update`, user, {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
  });
  return res.data;
};
