package com.koreait.restapi.dto;

import lombok.Data;

@Data
public class MemberDTO {
    private Integer id;
    private String username;
    private String password;
    private String email;
}
