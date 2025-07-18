package com.koreait.restapi.service;

import com.koreait.restapi.dto.BoardDTO;
import java.util.List;

public interface BoardService {
    boolean writeBoard(BoardDTO board);
    List<BoardDTO> getBoardList(int page, int size);
    int getBoardCount();
    BoardDTO getBoardById(int id);
    boolean updateBoard(BoardDTO board);
    boolean deleteBoard(int id, int userId); // userId(본인만 삭제)
}
