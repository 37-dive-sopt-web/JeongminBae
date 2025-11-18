import { useState } from "react";
import Header from "@/components/layout/Header";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import WithdrawModal from "@/components/withdraw/WithdrawModal";
import { updateUser } from "@/api/user.ts";
import * as styles from "./myPage.css.ts";

export default function MyPage() {
  const [displayName, setDisplayName] = useState(
    localStorage.getItem("userName") ?? "게스트",
  );

  const [name, setName] = useState(localStorage.getItem("userName") ?? "");
  const [email, setEmail] = useState(localStorage.getItem("email") ?? "");
  const [age, setAge] = useState(localStorage.getItem("age") ?? "");
  const [saving, setSaving] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);

  const userIdForDisplay = localStorage.getItem("userName") ?? "-";
  const canSave =
    name.trim() !== "" && email.includes("@") && age.trim() !== "";

  const handleSave = async () => {
    if (!canSave) {
      alert("모든 필드를 올바르게 입력해 주세요.");
      return;
    }

    const idStr = localStorage.getItem("userId");
    if (!idStr) {
      alert("로그인 정보가 없습니다. 다시 로그인해 주세요.");
      return;
    }

    try {
      setSaving(true);

      await updateUser(Number(idStr), {
        name,
        email,
        age: Number(age),
      });

      localStorage.setItem("userName", name);
      localStorage.setItem("email", email);
      localStorage.setItem("age", age);
      setDisplayName(name);

      alert("저장되었습니다.");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "정보 저장에 실패했습니다. 다시 시도해 주세요.";
      alert(message);
    } finally {
      setSaving(false);
    }
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
                <div className={styles.valueStrong}>{userIdForDisplay}</div>
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

