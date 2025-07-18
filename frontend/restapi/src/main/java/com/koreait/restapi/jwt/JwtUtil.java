package com.koreait.restapi.jwt;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    // 꼭 충분히 긴 비밀키여야 함! (32글자 이상)
    private final String SECRET = "lakrlajkdkopjoapdpjo3354odopwporuW78243yrhoefyoonyweynwyn23989n9v3n9v23n9893vr2n98";
    private final long EXPIRATION = 1000 * 60 * 60; // 1시간
    private final Key key = Keys.hmacShaKeyFor(SECRET.getBytes());

    // 토큰 발급 (username, userId를 claim에 넣는다)
    public String generateToken(String username, int userId) {
        return Jwts.builder()
                .setSubject(username)
                .claim("id", userId)
                // .claim("role", "USER") // 필요하면 role 등도 추가
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    // 토큰에서 username 꺼내기
    public String getUsernameFromToken(String token) {
        return parseClaims(token).getSubject();
    }

    // 토큰에서 userId 꺼내기
    public Integer getUserIdFromToken(String token) {
        return parseClaims(token).get("id", Integer.class);
    }

    // 토큰 검증
    public boolean isTokenValid(String token) {
        try {
            parseClaims(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }

    // 내부 Claims 파싱 (예외를 밖에서 catch할 수 있도록 따로 뺌)
    private Claims parseClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    // HttpServletRequest에서 토큰을 꺼내서 바로 userId 반환 (없으면 예외)
    public Integer getUserIdFromRequest(HttpServletRequest request) {
        String bearer = request.getHeader("Authorization");
        if (bearer != null && bearer.startsWith("Bearer ")) {
            String token = bearer.substring(7);
            return getUserIdFromToken(token);
        }
        throw new RuntimeException("토큰이 필요합니다! (Authorization: Bearer ...) 헤더 누락");
    }

    // 필요시: 토큰을 헤더에서 직접 추출하는 메서드도 만들 수 있음
    public String resolveToken(HttpServletRequest request) {
        String bearer = request.getHeader("Authorization");
        if (bearer != null && bearer.startsWith("Bearer ")) {
            return bearer.substring(7);
        }
        return null;
    }
}
