// src/pages/SignUp/SignUpPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as styles from "./signUpPage.css.ts";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

function SignUpPage() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleNext = () => {
    if (!username.trim()) return;
    // TODO: 다음 단계(비밀번호 입력)로 라우팅 및 아이디 전달
    alert(`다음 단계로 이동 (아이디: ${username})`);
  };

  const handleGoLogin = () => {
    navigate("/login");
  };

  const isNextDisabled = !username.trim();

  return (
    <div className={styles.page}>
      <div className={styles.box}>
        <button
          type="button"
          className={styles.backButton}
          onClick={handleGoLogin}
          aria-label="뒤로"
        >
          ←
        </button>

        <h1 className={styles.title}>회원가입</h1>

        <div className={styles.field}>
          <div className={styles.label}>아이디</div>
          <Input
            type="text"
            placeholder="아이디를 입력해 주세요"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className={styles.actions}>
          <Button type="button" fullWidth disabled={isNextDisabled} onClick={handleNext}>
            다음
          </Button>
        </div>

        <p className={styles.footerText}>
          이미 계정이 있나요?
          <Button type="button" variant="link" onClick={handleGoLogin}>
            로그인으로 돌아가기
          </Button>
        </p>
      </div>
    </div>
  );
}

export default SignUpPage;
