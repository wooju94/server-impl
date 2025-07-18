package com.koreait.restapi.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BoardDTO {
    private Integer id;
    private String title;
    private String content;
    private Integer writerId;
    private String writerName;           // 조인시 사용 (선택)
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
