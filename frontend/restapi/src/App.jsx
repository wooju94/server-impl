import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import MyInfoPage from "./pages/MyInfoPage";
import BoardWritePage from "./pages/BoardWritePage";
import BoardListPage from "./pages/BoardListPage";
import BoardDetailPage from "./pages/BoardDetailPage";

function Home() {
  return (
    <div>
      환영합니다! <a href="/login">로그인</a> 또는{" "}
      <a href="/signup">회원가입</a>을 해주세요.
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/myinfo" element={<MyInfoPage />} />
        <Route path="/board/write" element={<BoardWritePage />} />
        <Route path="/board/list" element={<BoardListPage />} />
        <Route path="/board/:id" element={<BoardDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
