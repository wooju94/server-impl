package com.koreait.restapi.service;

import com.koreait.restapi.dto.MemberDTO;

public interface MemberService {
    boolean signup(MemberDTO member);
    MemberDTO login(String username, String password);
    MemberDTO findById(Integer id);            // 추가
    boolean updateMember(MemberDTO member);     // 추가
}
