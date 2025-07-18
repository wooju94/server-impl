import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const isLogin = !!localStorage.getItem("jwt");
  return (
    <nav style={{ marginBottom: 24 }}>
      <Link to="/">홈</Link> | <Link to="/board/write">글쓰기</Link> |{" "}
      <Link to="/myinfo">내정보</Link> |{" "}
      {isLogin ? (
        <button
          onClick={() => {
            localStorage.removeItem("jwt");
            window.location.reload();
          }}
        >
          로그아웃
        </button>
      ) : (
        <>
          <Link to="/login">로그인</Link> | <Link to="/signup">회원가입</Link>
        </>
      )}
    </nav>
  );
}
