import { useState } from "react";
import Header from "@/components/layout/Header";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import WithdrawModal from "@/components/withdraw/WithdrawModal";
import * as styles from "./members.css.ts";
import { getUser, type Member } from "@/api/user.ts";

export default function MembersPage() {
  const [displayName] = useState(localStorage.getItem("userName") ?? "게스트");
  const [memberId, setMemberId] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Member | null>(null);
  const [showWithdraw, setShowWithdraw] = useState(false);

  const canSearch = memberId.trim() !== "";

  const handleSearch = async () => {
    if (!canSearch) return;

    try {
      setLoading(true);
      setResult(null);

      const member = await getUser(Number(memberId));
      setResult(member);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "회원 정보를 불러오지 못했습니다.";
      alert(message);
    } finally {
      setLoading(false);
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
          <h1 className={styles.title}>회원 조회</h1>

          <section className={styles.section}>
            <div className={styles.form}>
              <div className={styles.row}>
                <div className={styles.label}>회원 ID</div>
                <Input
                  type="number"
                  step={1}
                  min={0}
                  placeholder="숫자로 입력"
                  value={memberId}
                  onChange={(e) => setMemberId(e.currentTarget.value)}
                />
              </div>
              <div className={styles.actions}>
                <Button
                  type="button"
                  fullWidth
                  disabled={!canSearch || loading}
                  onClick={handleSearch}
                >
                  {loading ? "확인 중..." : "확인"}
                </Button>
              </div>
            </div>
          </section>

          {result && (
            <section className={styles.section} style={{ marginTop: 16 }}>
              <div className={styles.form}>
                <div className={styles.rowSplit}>
                  <div className={styles.label}>회원 ID</div>
                  <div className={styles.valueStrong}>{result.id}</div>
                </div>
                <div className={styles.rowSplit}>
                  <div className={styles.label}>이름</div>
                  <div className={styles.valueStrong}>{result.name}</div>
                </div>
                <div className={styles.rowSplit}>
                  <div className={styles.label}>이메일</div>
                  <div className={styles.valueStrong}>{result.email}</div>
                </div>
                <div className={styles.rowSplit}>
                  <div className={styles.label}>나이</div>
                  <div className={styles.valueStrong}>{result.age}</div>
                </div>
              </div>
            </section>
          )}
        </div>
      </main>

      {showWithdraw && (
        <WithdrawModal onClose={() => setShowWithdraw(false)} />
      )}
    </div>
  );
}

