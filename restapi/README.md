# Spring Boot REST API (회원 + 게시판 서비스)

## 소개
- Spring Boot + MyBatis + MySQL 기반의 회원/게시판 API 서버입니다.
- JWT 인증 방식 사용 (로그인/회원가입/글쓰기/수정/삭제/내정보)

## 개발환경
- Java 17
- Spring Boot 3.x
- MyBatis
- MySQL

## 실행 방법

1. **DB 준비**
    - MySQL에 DB 생성 (wooju)
      ```
      CREATE DATABASE wooju DEFAULT CHARACTER SET utf8mb4;
      ```
    - 테이블 및 초기 쿼리는 `database.sql` 참고

2. **설정**
    - `src/main/resources/application.properties` 파일에  
      DB 계정정보 및 설정 입력  
      (샘플 예시)
      ```
      spring.datasource.url=jdbc:mysql://localhost:3306/wooju?serverTimezone=Asia/Seoul&characterEncoding=UTF-8
      spring.datasource.username=YOUR_DB_USER
      spring.datasource.password=YOUR_DB_PW
      ```

3. **빌드 및 실행**
    - IntelliJ에서 Gradle 빌드 또는
      ```
      ./gradlew build
      ./gradlew bootRun
      ```
    - 서버 실행 후 기본 포트는 8080

## 주요 API

- 회원가입: `POST /api/member/signup`
- 로그인: `POST /api/member/login`
- 내정보 조회/수정: `GET /api/member/me`, `PUT /api/member/me`
- 게시글 작성/목록/상세/수정/삭제:  
  `POST /api/board/write`, `GET /api/board/list`, `GET /api/board/{id}`, `PUT /api/board/{id}`, `DELETE /api/board/{id}`
- 모든 쿼리는 `database.sql`에서 확인

## 기타
- 민감정보(application.properties, .env 등)는 git에 포함되지 않음
- JWT 시크릿 키 등은 환경변수/외부설정 권장

프론트엔드 (React)

npm install
npm run dev   # 또는 npm start

기술 스택
Frontend: React, Axios, React Router
Backend: Spring Boot, MyBatis, H2 or MySQL
Build Tool: Gradle


