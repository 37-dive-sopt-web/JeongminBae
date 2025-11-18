import { useNavigate } from "react-router-dom";
import * as styles from "./signUpPage.css.ts";
import SignUpPageId from "./SignUpPageId";
import SignUpPagePassword from "./SignUpPagePassword";
import SignUpPageProfile from "./SignUpPageProfile";
import { useSignup } from "@/hooks/useSignup";

export default function SignUpPage() {
  const navigate = useNavigate();
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
          onClick={() => (step === 1 ? navigate("/login") : setStep((prev) => (prev - 1) as 1 | 2 | 3))}
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
            onSubmit={() => {
              if (!canSubmit) return;
              alert("회원가입 성공! 로그인 페이지로 이동합니다.");
              navigate("/login");
            }}
            disabled={!canSubmit}
          />
        )}

        <p className={styles.footerText}>
          이미 계정이 있나요? {" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            style={{ border: "none", background: "none", color: "#65C9B0", textDecoration: "underline", cursor: "pointer" }}
          >
            로그인으로 돌아가기
          </button>
        </p>
      </div>
    </div>
  );
}
