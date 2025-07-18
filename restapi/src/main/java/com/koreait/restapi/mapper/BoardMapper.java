package com.koreait.restapi.mapper;

import com.koreait.restapi.dto.BoardDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface BoardMapper {
    int insertBoard(BoardDTO board);
    List<BoardDTO> selectBoardList(int offset, int limit);
    int selectBoardCount();
    BoardDTO selectBoardById(int id);
    int updateBoard(BoardDTO board);
    int deleteBoard(int id);
}
