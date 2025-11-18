import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as styles from "./loginPage.css.ts";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const isLoginDisabled = !username || !password;

  return (
    <div className={styles.page}>
      <div className={styles.box}>
        <h1 className={styles.title}>로그인</h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!username || !password) {
              setError("아이디와 비밀번호를 입력해주세요.");
              return;
            }
            setError("");
            // TODO: ky 로그인 API 연동
            alert(`로그인 시도: ${username}`);
          }}
        >
          <div className={styles.field}>
            <div className={styles.label}>아이디</div>
            <Input
              type="text"
              placeholder="아이디를 입력해 주세요"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <div className={styles.label}>비밀번호</div>
            <Input
              type="password"
              placeholder="비밀번호를 입력해 주세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className={styles.errorText}>{error}</p>}

          <div className={styles.actions}>
            <Button type="submit" fullWidth disabled={isLoginDisabled}>
              로그인
            </Button>
            <Button type="button" variant="link" onClick={() => navigate("/signup")}>
              회원가입
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
