package com.koreait.restapi.controller;

import com.koreait.restapi.dto.MemberDTO;
import com.koreait.restapi.jwt.JwtUtil;
import com.koreait.restapi.service.MemberService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/member")
@CrossOrigin(origins = "http://localhost:5173")
public class MemberController {

    private final MemberService memberService;
    private final JwtUtil jwtUtil;

    public MemberController(MemberService memberService, JwtUtil jwtUtil) {
        this.memberService = memberService;
        this.jwtUtil = jwtUtil;
    }

    // 회원가입
    @PostMapping("/signup")
    public String signup(@RequestBody MemberDTO member) {
        boolean result = memberService.signup(member);
        return result ? "회원가입 성공" : "이미 존재하는 아이디입니다";
    }

    // 로그인(JWT 토큰 발급)
    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Map<String, String> request) {
        String username = request.get("username");
        String password = request.get("password");
        MemberDTO member = memberService.login(username, password);
        Map<String, Object> result = new HashMap<>();
        if (member == null) {
            result.put("success", false);
            result.put("message", "아이디 또는 비밀번호가 틀렸습니다.");
            return result;
        }
        String token = jwtUtil.generateToken(member.getUsername(), member.getId());
        result.put("success", true);
        result.put("token", token);
        return result;
    }

    // 내 정보 조회 (토큰 필요)
    @GetMapping("/me")
    public Map<String, Object> getMyInfo(HttpServletRequest request) {
        Map<String, Object> result = new HashMap<>();
        try {
            Integer userId = jwtUtil.getUserIdFromRequest(request);
            MemberDTO member = memberService.findById(userId);
            if (member == null) {
                result.put("success", false);
                result.put("message", "사용자 정보 없음");
            } else {
                result.put("success", true);
                result.put("data", member);
            }
        } catch (RuntimeException e) {
            result.put("success", false);
            result.put("message", e.getMessage());
        }
        return result;
    }

    // 내 정보 수정 (토큰 필요)
    @PutMapping("/me")
    public Map<String, Object> updateMyInfo(@RequestBody MemberDTO reqMember, HttpServletRequest request) {
        Map<String, Object> result = new HashMap<>();
        try {
            Integer userId = jwtUtil.getUserIdFromRequest(request);
            reqMember.setId(userId); // 내 id로만 수정 허용
            boolean updated = memberService.updateMember(reqMember);
            result.put("success", updated);
            result.put("message", updated ? "수정 완료" : "수정 실패");
        } catch (RuntimeException e) {
            result.put("success", false);
            result.put("message", e.getMessage());
        }
        return result;
    }
}
