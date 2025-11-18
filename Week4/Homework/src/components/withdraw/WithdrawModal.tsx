import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as styles from "./withdrawModal.css.ts";
import { deleteUser } from "@/api/user.ts";

export default function WithdrawModal({ onClose }: { onClose: () => void }) {
  const [withdrawing, setWithdrawing] = useState(false);
  const navigate = useNavigate();

  const handleCancel = () => {
    if (withdrawing) return;
    onClose();
  };

  const handleConfirmWithdraw = async () => {
    const idStr = localStorage.getItem("userId");
    if (!idStr) {
      alert("로그인된 회원 정보가 없습니다.");
      onClose();
      return;
    }

    try {
      setWithdrawing(true);

      const message = await deleteUser(Number(idStr));

      localStorage.removeItem("userId");
      localStorage.removeItem("userName");
      localStorage.removeItem("name");
      localStorage.removeItem("email");
      localStorage.removeItem("age");

      alert(message || "회원 탈퇴가 완료되었습니다. 로그인 페이지로 이동합니다.");
      navigate("/login");
    } catch (error) {
      const msg =
        error instanceof Error
          ? error.message
          : "회원 탈퇴에 실패했습니다. 다시 시도해 주세요.";
      alert(msg);
    } finally {
      setWithdrawing(false);
      onClose();
    }
  };

  return (
    <div className={styles.modalOverlay} role="dialog" aria-modal="true">
      <div className={styles.modal}>
        <h2 className={styles.modalTitle}>정말 탈퇴하시겠어요?</h2>
        <p className={styles.modalText}>탈퇴 후에는 모든 정보가 삭제돼요.</p>

        <div className={styles.modalActions}>
          <button
            type="button"
            className={styles.modalButton}
            onClick={handleCancel}
            disabled={withdrawing}
          >
            취소
          </button>
          <button
            type="button"
            className={`${styles.modalButton} ${styles.modalButtonDanger}`}
            onClick={handleConfirmWithdraw}
            disabled={withdrawing}
          >
            회원탈퇴
          </button>
        </div>
      </div>
    </div>
  );
}

