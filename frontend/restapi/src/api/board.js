import axios from "axios";

export const API_SERVER = "http://localhost:8080";

export const createPost = async (post, token) => {
  const res = await axios.post(BASE_URL, post, {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
  });
  return res.data;
};

export const getPosts = async (page = 1, size = 10) => {
  const token = localStorage.getItem("token");
  const res = await axios.get(`${BASE_URL}?page=${page}&size=${size}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return res.data;
};
