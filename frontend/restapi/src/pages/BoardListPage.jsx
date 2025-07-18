// src/pages/BoardListPage.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const API_SERVER = "http://localhost:8080";

export default function BoardListPage() {
  const [boards, setBoards] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const size = 10; // 한 페이지당 10개

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const res = await axios.get(
          `${API_SERVER}/api/board/list?page=${page}&size=${size}`
        );
        setBoards(res.data.data);
        setTotal(res.data.total);
      } catch (e) {
        setBoards([]);
      }
    };
    fetchBoards();
  }, [page]);

  const pageCount = Math.ceil(total / size);

  return (
    <div>
      <h2>게시글 목록</h2>
      <Link to="/board/write">
        <button>글쓰기</button>
      </Link>
      <table border="1" cellPadding={8}>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          {boards.length === 0 ? (
            <tr>
              <td colSpan={4}>게시글이 없습니다.</td>
            </tr>
          ) : (
            boards.map((board) => (
              <tr key={board.id}>
                <td>{board.id}</td>
                <td>
                  <Link to={`/board/${board.id}`}>{board.title}</Link>
                </td>
                <td>{board.writerName}</td>
                <td>
                  {board.createdAt
                    ? board.createdAt.replace("T", " ").slice(0, 16)
                    : ""}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {/* 페이징 */}
      <div style={{ marginTop: 20 }}>
        {Array.from({ length: pageCount }, (_, idx) => idx + 1).map((num) => (
          <button
            key={num}
            onClick={() => setPage(num)}
            style={{ fontWeight: page === num ? "bold" : "normal" }}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
}
