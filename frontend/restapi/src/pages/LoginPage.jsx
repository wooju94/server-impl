import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const API_SERVER = "http://localhost:8080";

export default function LoginPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_SERVER}/api/member/login`, form);
      if (res.data.success) {
        localStorage.setItem("jwt", res.data.token);
        alert("로그인 성공!");
        navigate("/board/list"); // 홈(글목록)으로 이동
      } else {
        setMsg(res.data.message);
      }
    } catch (err) {
      setMsg("오류 발생: " + err.message);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        name="username"
        value={form.username}
        onChange={onChange}
        placeholder="아이디"
        required
      />
      <input
        name="password"
        value={form.password}
        onChange={onChange}
        placeholder="비밀번호"
        type="password"
        required
      />
      <button type="submit">로그인</button>
      <div>{msg}</div>
    </form>
  );
}
