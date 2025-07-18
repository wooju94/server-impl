package com.koreait.restapi.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PostFileDTO {
    private  int postId;
    private  String originalName;
    private  String savedName;
    private  String thumbnailName;
    private  String uploadPath;
}
