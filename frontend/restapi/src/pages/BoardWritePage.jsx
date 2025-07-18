import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const API_SERVER = "http://localhost:8080";

export default function BoardWritePage() {
  const [form, setForm] = useState({ title: "", content: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  // 입력값 변경 핸들러
  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // 폼 제출 시 실행
  const onSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("jwt");
    if (!token) {
      setMsg("로그인 후 이용해 주세요!");
      return;
    }
    try {
      const res = await axios.post(`${API_SERVER}/api/board/write`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        alert("게시글이 등록되었습니다!");
        navigate("/board/list"); // 글목록(홈)으로 이동
      } else {
        setMsg(res.data.message || "글 등록 실패");
      }
    } catch (e) {
      setMsg("에러: " + e.message);
    }
  };

  return (
    <div>
      <h2>게시글 작성</h2>
      <form onSubmit={onSubmit}>
        <input
          name="title"
          value={form.title}
          onChange={onChange}
          placeholder="제목"
          required
        />
        <br />
        <textarea
          name="content"
          value={form.content}
          onChange={onChange}
          placeholder="내용"
          required
          rows={7}
        />
        <br />
        <button type="submit">등록</button>
      </form>
      <div>{msg}</div>
    </div>
  );
}
