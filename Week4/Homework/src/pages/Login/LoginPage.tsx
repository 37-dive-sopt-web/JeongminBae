import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as styles from "./loginPage.css.ts";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { login } from "@/api/user.ts";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const isLoginDisabled = !username || !password || submitting;

  return (
    <div className={styles.page}>
      <div className={styles.box}>
        <h1 className={styles.title}>로그인</h1>

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            if (!username || !password) {
              setError("아이디와 비밀번호를 입력해 주세요.");
              return;
            }

            try {
              setError("");
              setSubmitting(true);

              const result = await login({ username, password });

              localStorage.setItem("userId", String(result.userId));
              localStorage.setItem("userName", username);

              navigate("/mypage");
            } catch (err) {
              const message =
                err instanceof Error
                  ? err.message
                  : "로그인에 실패했습니다. 다시 시도해 주세요.";
              setError(message);
            } finally {
              setSubmitting(false);
            }
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
              {submitting ? "로그인 중..." : "로그인"}
            </Button>
            <Button
              type="button"
              variant="link"
              onClick={() => navigate("/signup")}
            >
              회원가입
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

