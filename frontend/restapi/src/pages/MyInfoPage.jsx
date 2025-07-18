import React, { useEffect, useState } from "react";
import axios from "axios";
const API_SERVER = "http://localhost:8080";

export default function MyInfoPage() {
  const [info, setInfo] = useState(null);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const fetchMyInfo = async () => {
      const token = localStorage.getItem("jwt");
      if (!token) {
        setMsg("로그인이 필요합니다.");
        return;
      }
      try {
        const res = await axios.get(`${API_SERVER}/api/member/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.success) {
          setInfo(res.data.data);
        } else {
          setMsg(res.data.message);
        }
      } catch (e) {
        setMsg("오류: " + e.message);
      }
    };
    fetchMyInfo();
  }, []);

  if (msg) return <div>{msg}</div>;
  if (!info) return <div>로딩중...</div>;

  return (
    <div>
      <h2>내 정보</h2>
      <p>ID: {info.id}</p>
      <p>아이디: {info.username}</p>
      <p>이메일: {info.email}</p>
    </div>
  );
}
