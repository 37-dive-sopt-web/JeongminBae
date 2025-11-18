import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as styles from "./signUpPage.css.ts";
import SignUpPageId from "./SignUpPageId";
import SignUpPagePassword from "./SignUpPagePassword";
import SignUpPageProfile from "./SignUpPageProfile";
import { useSignup } from "@/hooks/useSignup";
import { signUp } from "@/api/user.ts";
import { vars } from "@/styles/theme.css.ts";

export default function SignUpPage() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const {
    step,
    setStep,
    username,
    setUsername,
    password,
    setPassword,
    confirm,
    setConfirm,
    name,
    setName,
    email,
    setEmail,
    age,
    setAge,
    usernameTooLong,
    canNextFromId,
    canNextFromPw,
    canSubmit,
  } = useSignup();

  return (
    <div className={styles.page}>
      <div className={styles.box}>
        <button
          type="button"
          className={styles.backButton}
          onClick={() =>
            step === 1
              ? navigate("/login")
              : setStep((prev) => (prev - 1) as 1 | 2 | 3)
          }
          aria-label="뒤로"
        >
          ←
        </button>

        <h1 className={styles.title}>회원가입</h1>

        {step === 1 && (
          <SignUpPageId
            username={username}
            onChange={setUsername}
            tooLong={usernameTooLong}
            onNext={() => setStep(2)}
            disabled={!canNextFromId}
          />
        )}

        {step === 2 && (
          <SignUpPagePassword
            password={password}
            confirm={confirm}
            onChangePassword={setPassword}
            onChangeConfirm={setConfirm}
            onNext={() => setStep(3)}
            disabled={!canNextFromPw}
          />
        )}

        {step === 3 && (
          <SignUpPageProfile
            name={name}
            email={email}
            age={age}
            onChangeName={setName}
            onChangeEmail={setEmail}
            onChangeAge={setAge}
            onSubmit={async () => {
              if (!canSubmit || submitting) return;

              try {
                setSubmitting(true);

                await signUp({
                  username,
                  password,
                  name,
                  email,
                  age: Number(age),
                });

                // 회원가입 정보 로컬스토리지에 저장
                localStorage.setItem("userName", username);
                localStorage.setItem("name", name);
                localStorage.setItem("email", email);
                localStorage.setItem("age", age);

                alert("회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.");
                navigate("/login");
              } catch (error) {
                const message =
                  error instanceof Error
                    ? error.message
                    : "회원가입에 실패했습니다. 다시 시도해 주세요.";
                alert(message);
              } finally {
                setSubmitting(false);
              }
            }}
            disabled={!canSubmit || submitting}
          />
        )}

        <p className={styles.footerText}>
          이미 회원이신가요?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            style={{
              border: "none",
              background: "none",
              color: vars.color.primaryHover,
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            로그인하러 가기
          </button>
        </p>
      </div>
    </div>
  );
}

