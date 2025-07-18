package com.koreait.restapi.service;

import com.koreait.restapi.dto.BoardDTO;
import com.koreait.restapi.mapper.BoardMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BoardServiceImpl implements BoardService {

    private final BoardMapper boardMapper;

    public BoardServiceImpl(BoardMapper boardMapper) {
        this.boardMapper = boardMapper;
    }

    @Override
    public boolean writeBoard(BoardDTO board) {
        return boardMapper.insertBoard(board) > 0;
    }

    @Override
    public List<BoardDTO> getBoardList(int page, int size) {
        int offset = (page - 1) * size;
        return boardMapper.selectBoardList(offset, size);
    }

    @Override
    public int getBoardCount() {
        return boardMapper.selectBoardCount();
    }

    @Override
    public BoardDTO getBoardById(int id) {
        return boardMapper.selectBoardById(id);
    }

    @Override
    public boolean updateBoard(BoardDTO board) {
        return boardMapper.updateBoard(board) > 0;
    }

    @Override
    public boolean deleteBoard(int id, int userId) {
        BoardDTO board = boardMapper.selectBoardById(id);
        if (board == null || !board.getWriterId().equals(userId)) {
            return false;
        }
        return boardMapper.deleteBoard(id) > 0;
    }
}
