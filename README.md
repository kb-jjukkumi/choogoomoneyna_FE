# 추구머니나

## ⚠️ 개발 환경 및 버전 안내

아래 버전과 설정을 팀원 모두 꼭 맞춰주세요!

- **Node.js**: v22.14.0

---

### Commit Convention

해당 작업이 어떤 작업인지 나타낸다. 첫글자는 소문자로 작성한다.

- build: 빌드/컴파일/패키지 프로세스 또는 문서 생성과 같은 보조 도구 변경
- chore: 오타 수정, 공백제거, 문서 이동등 사소한 작업
- docs: 변경 사항만 문서화
- feat: 새로운 기능
- fix: 버그 수정
- refactor: 버그를 수정하거나 기능을 추가하지 않는 코드 변경
- style: 코드 의미에 영향을 미치지 않는 변경(흰색 공간, 서식, 세미콜론 누락 등)

## 프로젝트 실행 방법

### 1) 패키지 설치

```sh
npm install
```

### 2) 환경 변수 설정

`.env.local`파일을 루트 디렉토리에 생성한 다음 아래의 값들을 추가해주세요.

```js
# .env.local (예시)
VITE_API_BASE_URL= {API_URL}

# 카카오 인가 URL 전체 문자열 (client_id, redirect_uri, response_type=code 포함)
VITE_KAKAO_API_URL=https://kauth.kakao.com/oauth/authorize?client_id={YOUR_CLIENT_ID}&redirect_uri={YOUR_REDIRECT_URI}&response_type=code
```

- VITE_API_BASE_URL: 백엔드 API 서버의 베이스 URL.
- VITE_KAKAO_API_URL: 카카오 로그인 인가 요청 URL 전체. `client_id`, `redirect_uri`, `response_type=code`를 포함해야 합니다.
  - `redirect_uri`는 카카오 개발자 콘솔에 등록된 값과 반드시 동일해야 합니다.

### 3) 개발 서버 실행

```sh
npm run dev
```

브라우저가 자동으로 열리지 않는다면 로컬 주소(`http://localhost:5173`)로 접속하세요.
