import Header from "@/components/layout/Header";
import * as styles from "./myPage.css.ts";

export default function MyPage() {
  const userName = localStorage.getItem("userName") ?? "게스트";

  return (
    <div>
      {/* Header */}
      <Header userName={userName} />

      {/* 본문 */}
      <main className={styles.main}>
        <h1 className={styles.title}>내 정보</h1>
        {/* TODO: API 연동 후 내 정보 편집 폼/표시 */}
      </main>
    </div>
  );
}
