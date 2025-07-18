// src/pages/BoardDetailPage.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_SERVER } from "../api";
import { useNavigate, useParams, Link } from "react-router-dom";

export default function BoardDetailPage() {
  const { id } = useParams();
  const [board, setBoard] = useState(null);
  const [msg, setMsg] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [form, setForm] = useState({ title: "", content: "" });
  const navigate = useNavigate();

  // 현재 로그인한 사용자의 id (jwt에서 추출)
  const [myId, setMyId] = useState(null);

  useEffect(() => {
    // 게시글 상세 조회
    const fetchBoard = async () => {
      try {
        const res = await axios.get(`${API_SERVER}/api/board/${id}`);
        if (res.data.success) {
          setBoard(res.data.data);
          setForm({
            title: res.data.data.title,
            content: res.data.data.content,
          });
        } else {
          setMsg(res.data.message);
        }
      } catch (e) {
        setMsg("오류: " + e.message);
      }
    };
    // 내 id 구하기 (토큰이 있을 때만)
    const fetchMyId = async () => {
      const token = localStorage.getItem("jwt");
      if (token) {
        try {
          const res = await axios.get(`${API_SERVER}/api/member/me`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (res.data.success) setMyId(res.data.data.id);
        } catch {}
      }
    };
    fetchBoard();
    fetchMyId();
    // eslint-disable-next-line
  }, [id]);

  // 글 수정/삭제 권한: 본인만 가능
  const isOwner = board && myId && board.writerId === myId;

  // 수정 폼 입력 핸들러
  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // 수정 요청
  const onUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("jwt");
    if (!token) {
      setMsg("로그인 후 이용 가능합니다.");
      return;
    }
    try {
      const res = await axios.put(`${API_SERVER}/api/board/${id}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        setMsg("수정 완료!");
        setIsEdit(false);
        setBoard((prev) => ({ ...prev, ...form }));
      } else {
        setMsg(res.data.message || "수정 실패");
      }
    } catch (e) {
      setMsg("에러: " + e.message);
    }
  };

  // 삭제 요청
  const onDelete = async () => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      setMsg("로그인 후 이용 가능합니다.");
      return;
    }
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    try {
      const res = await axios.delete(`${API_SERVER}/api/board/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        alert("삭제 완료!");
        navigate("/board/list");
      } else {
        setMsg(res.data.message || "삭제 실패");
      }
    } catch (e) {
      setMsg("에러: " + e.message);
    }
  };

  if (msg) return <div>{msg}</div>;
  if (!board) return <div>로딩중...</div>;

  return (
    <div>
      <h2>게시글 상세</h2>
      {isEdit ? (
        <form onSubmit={onUpdate}>
          <input name="title" value={form.title} onChange={onChange} required />
          <br />
          <textarea
            name="content"
            value={form.content}
            onChange={onChange}
            required
            rows={7}
          />
          <br />
          <button type="submit">수정 완료</button>
          <button type="button" onClick={() => setIsEdit(false)}>
            취소
          </button>
        </form>
      ) : (
        <>
          <div>
            <b>제목:</b> {board.title}
          </div>
          <div>
            <b>내용:</b> {board.content}
          </div>
          <div>
            <b>작성자:</b> {board.writerName}
          </div>
          <div>
            <b>작성일:</b>{" "}
            {board.createdAt
              ? board.createdAt.replace("T", " ").slice(0, 16)
              : ""}
          </div>
          <Link to="/board/list">
            <button>목록</button>
          </Link>
          {isOwner && (
            <>
              <button onClick={() => setIsEdit(true)}>수정</button>
              <button onClick={onDelete}>삭제</button>
            </>
          )}
        </>
      )}
    </div>
  );
}
