import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as styles from "./withdrawModal.css.ts";

export default function WithdrawModal({ onClose }: { onClose: () => void }) {
  const [withdrawing, setWithdrawing] = useState(false);
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  const handleCancel = () => {
    if (withdrawing) return;
    onClose();
  };

  const handleConfirmWithdraw = async () => {
    if (!userId) {
      alert("로그인된 회원 정보가 없습니다.");
      onClose();
      return;
    }

    try {
      setWithdrawing(true);

      // TODO: ky 회원탈퇴 API 연동
      // 임시 구현: 로컬스토리지에 저장된 내 정보를 삭제
      localStorage.removeItem("userId");
      localStorage.removeItem("userName");
      localStorage.removeItem("email");
      localStorage.removeItem("age");

      alert("회원탈퇴가 완료되었습니다. 로그인 페이지로 이동합니다.");
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("회원탈퇴에 실패했습니다. 다시 시도해 주세요.");
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
