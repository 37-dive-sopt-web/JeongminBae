// src/pages/auth/LoginPage.tsx
import { useState } from "react";
import * as styles from "./loginPage.css.ts";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    // 아이디/비번 비어 있으면 에러
    if (!username || !password) {
      setError("아이디와 비밀번호를 모두 입력해주세요.");
      return;
    }

    setError("");
    // 나중에 여기서 ky로 로그인 API 호출
    alert(`로그인 시도: ${username}`);
  };

  const handleGoSignUp = () => {
    // 나중에 라우터 연결 자리
    alert("회원가입 페이지로 이동 (라우터 연결 예정)");
  };

  const isLoginDisabled = !username || !password;

  return (
    <div className={styles.page}>
      <div className={styles.box}>
        <h1 className={styles.title}>로그인</h1>

        <form
          onSubmit={(event) => {
            event.preventDefault(); // 새로고침 막기
            handleSubmit();
          }}
        >
          <div className={styles.field}>
            <div className={styles.label}>아이디</div>
            <input
              className={styles.input}
              type="text"
              placeholder="아이디를 입력해 주세요"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <div className={styles.label}>비밀번호</div>
            <input
              className={styles.input}
              type="password"
              placeholder="비밀번호를 입력해 주세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className={styles.errorText}>{error}</p>}

          <div className={styles.actions}>
            <button
              type="submit"
              className={styles.loginButton}
              disabled={isLoginDisabled}
            >
              로그인
            </button>
            <button
              type="button"
              className={styles.signupButton}
              onClick={handleGoSignUp}
            >
              회원가입
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
