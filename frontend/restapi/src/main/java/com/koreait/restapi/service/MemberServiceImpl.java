package com.koreait.restapi.service;

import com.koreait.restapi.dto.MemberDTO;
import com.koreait.restapi.mapper.MemberMapper;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.stereotype.Service;

@Service
public class MemberServiceImpl implements MemberService {

    private final MemberMapper memberMapper;

    public MemberServiceImpl(MemberMapper memberMapper) {
        this.memberMapper = memberMapper;
    }

    @Override
    public boolean signup(MemberDTO member) {
        if(memberMapper.findByUsername(member.getUsername()) != null) {
            return false;
        }
        String hash = BCrypt.hashpw(member.getPassword(), BCrypt.gensalt());
        member.setPassword(hash);
        memberMapper.insertMember(member);
        return true;
    }

    @Override
    public MemberDTO login(String username, String password) {
        MemberDTO member = memberMapper.findByUsername(username);
        if (member == null) return null;
        if (!BCrypt.checkpw(password, member.getPassword())) return null;
        return member;
    }

    // 회원 id로 정보 조회
    @Override
    public MemberDTO findById(Integer id) {
        return memberMapper.findById(id);
    }

    // 회원 정보 수정
    @Override
    public boolean updateMember(MemberDTO member) {
        return memberMapper.updateMember(member) > 0;
    }
}
