// src/pages/MyPage/MyPage.tsx
import { useState } from "react";
import Header from "@/components/layout/Header";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import WithdrawModal from "@/components/withdraw/WithdrawModal";
import * as styles from "./myPage.css.ts";

export default function MyPage() {
  const [displayName, setDisplayName] = useState(
    localStorage.getItem("userName") ?? "게스트"
  );

  const [name, setName] = useState(localStorage.getItem("userName") ?? "");
  const [email, setEmail] = useState(localStorage.getItem("email") ?? "");
  const [age, setAge] = useState(localStorage.getItem("age") ?? "");
  const [saving, setSaving] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);

  const userId = localStorage.getItem("userId") ?? "-";
  const canSave = name.trim() !== "" && email.includes("@") && age.trim() !== "";

  const handleSave = () => {
    if (!canSave) {
      alert("모든 항목을 올바르게 입력해 주세요.");
      return;
    }
    setSaving(true);
    localStorage.setItem("userName", name);
    localStorage.setItem("email", email);
    localStorage.setItem("age", age);
    setDisplayName(name);
    setSaving(false);
    alert("저장되었습니다.");
  };

  return (
    <div>
      <Header
        userName={displayName}
        onClickWithdraw={() => setShowWithdraw(true)}
      />

      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>내 정보</h1>
          <section className={styles.section}>
            <div className={styles.form}>
              <div className={styles.rowSplit}>
                <div className={styles.label}>아이디</div>
                <div className={styles.valueStrong}>{userId}</div>
              </div>

              <div className={styles.row}>
                <div className={styles.label}>이름</div>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="이름을 입력해 주세요"
                />
              </div>

              <div className={styles.row}>
                <div className={styles.label}>이메일</div>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                />
              </div>

              <div className={styles.row}>
                <div className={styles.label}>나이</div>
                <Input
                  type="number"
                  step={1}
                  min={0}
                  value={age}
                  onChange={(e) => setAge(e.currentTarget.value)}
                  placeholder="숫자로 입력"
                />
              </div>

              <div className={styles.actions}>
                <Button
                  type="button"
                  fullWidth
                  disabled={!canSave || saving}
                  onClick={handleSave}
                >
                  {saving ? "저장 중..." : "저장"}
                </Button>
              </div>
            </div>
          </section>
        </div>
      </main>

      {showWithdraw && (
        <WithdrawModal onClose={() => setShowWithdraw(false)} />
      )}
    </div>
  );
}
