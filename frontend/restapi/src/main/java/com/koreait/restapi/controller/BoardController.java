package com.koreait.restapi.controller;

import com.koreait.restapi.dto.BoardDTO;
import com.koreait.restapi.jwt.JwtUtil;
import com.koreait.restapi.service.BoardService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/board")
@CrossOrigin(origins = "http://localhost:5173")
public class BoardController {

    private final BoardService boardService;
    private final JwtUtil jwtUtil;

    public BoardController(BoardService boardService, JwtUtil jwtUtil) {
        this.boardService = boardService;
        this.jwtUtil = jwtUtil;
    }

    // 글 작성 (JWT 인증 필요)
    @PostMapping("/write")
    public Map<String, Object> write(@RequestBody BoardDTO board, HttpServletRequest request) {
        Map<String, Object> result = new HashMap<>();
        try {
            Integer userId = jwtUtil.getUserIdFromRequest(request);
            board.setWriterId(userId);
            boolean success = boardService.writeBoard(board);
            result.put("success", success);
            result.put("message", success ? "작성 성공" : "작성 실패");
        } catch (RuntimeException e) {
            result.put("success", false);
            result.put("message", e.getMessage());
        }
        return result;
    }

    // 목록 조회 (페이징)
    @GetMapping("/list")
    public Map<String, Object> list(@RequestParam(defaultValue = "1") int page,
                                    @RequestParam(defaultValue = "10") int size) {
        Map<String, Object> result = new HashMap<>();
        List<BoardDTO> boards = boardService.getBoardList(page, size);
        int total = boardService.getBoardCount();
        result.put("success", true);
        result.put("total", total);
        result.put("data", boards);
        return result;
    }

    // 상세 조회
    @GetMapping("/{id}")
    public Map<String, Object> detail(@PathVariable int id) {
        Map<String, Object> result = new HashMap<>();
        BoardDTO board = boardService.getBoardById(id);
        if (board == null) {
            result.put("success", false);
            result.put("message", "존재하지 않는 게시글");
        } else {
            result.put("success", true);
            result.put("data", board);
        }
        return result;
    }

    // 글 수정 (JWT 인증/본인만)
    @PutMapping("/{id}")
    public Map<String, Object> update(@PathVariable int id, @RequestBody BoardDTO board, HttpServletRequest request) {
        Map<String, Object> result = new HashMap<>();
        try {
            Integer userId = jwtUtil.getUserIdFromRequest(request);
            board.setId(id);
            board.setWriterId(userId);
            boolean success = boardService.updateBoard(board);
            result.put("success", success);
            result.put("message", success ? "수정 성공" : "수정 실패(권한 없음 등)");
        } catch (RuntimeException e) {
            result.put("success", false);
            result.put("message", e.getMessage());
        }
        return result;
    }

    // 글 삭제 (JWT 인증/본인만)
    @DeleteMapping("/{id}")
    public Map<String, Object> delete(@PathVariable int id, HttpServletRequest request) {
        Map<String, Object> result = new HashMap<>();
        try {
            Integer userId = jwtUtil.getUserIdFromRequest(request);
            boolean success = boardService.deleteBoard(id, userId);
            result.put("success", success);
            result.put("message", success ? "삭제 성공" : "삭제 실패(권한 없음 등)");
        } catch (RuntimeException e) {
            result.put("success", false);
            result.put("message", e.getMessage());
        }
        return result;
    }
}
