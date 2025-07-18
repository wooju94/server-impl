import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const API_SERVER = "http://localhost:8080";

export default function SignupPage() {
  const [form, setForm] = useState({ username: "", password: "", email: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_SERVER}/api/member/signup`, form);
      if (res.data === "회원가입 성공") {
        // 성공시 로그인 페이지로 자동 이동!
        alert("회원가입이 완료되었습니다. 로그인 해주세요.");
        navigate("/login");
      } else {
        setMsg(res.data);
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
      <input
        name="email"
        value={form.email}
        onChange={onChange}
        placeholder="이메일"
      />
      <button type="submit">회원가입</button>
      <div>{msg}</div>
    </form>
  );
}
