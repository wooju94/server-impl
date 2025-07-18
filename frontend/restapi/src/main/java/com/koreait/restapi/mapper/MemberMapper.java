package com.koreait.restapi.mapper;

import com.koreait.restapi.dto.MemberDTO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MemberMapper {
    int insertMember(MemberDTO member);
    MemberDTO findByUsername(String username);

    // 추가
    MemberDTO findById(Integer id);
    int updateMember(MemberDTO member);
}
