import { NavLink, useNavigate } from "react-router-dom";
import * as styles from "./header.css.ts";

type Props = {
  userName: string;
  onClickWithdraw?: () => void;
};

function NavItem({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `${styles.navItem}${isActive ? " active" : ""}`}
    >
      {children}
    </NavLink>
  );
}

export default function Header({ userName, onClickWithdraw }: Props) {
  const navigate = useNavigate();

  const handleLogout = () => {
    const ok = window.confirm("로그아웃하시겠습니까?");
    if (!ok) return;
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    navigate("/login");
  };

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        {/* 왼쪽: 타이틀 + 사용자명 */}
        <div className={styles.left}>
          <div className={styles.title}>마이페이지</div>
          <div className={styles.subtitle}>안녕하세요, {userName}</div>
        </div>

        {/* 오른쪽: 네비게이션 */}
        <nav className={styles.nav}>
          <NavItem to="/mypage">내 정보</NavItem>
          <NavItem to="/members">회원 조회</NavItem>

          <button type="button" className={styles.navButton} onClick={handleLogout}>
            로그아웃
          </button>

          {onClickWithdraw && (
            <button
              type="button"
              className={styles.navButton}
              onClick={onClickWithdraw}
            >
              회원탈퇴
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
