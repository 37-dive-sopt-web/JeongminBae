import { useState } from "react";
import Header from "./components/Header";
import GlobalStyle from "./styles/globalStyles";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./styles/theme";

function App() {
  const [tab, setTab] = useState("game");

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <div style={{ padding: "16px", background: "#f8fff9", minHeight: "100vh" }}>
        {/* 헤더 */}
        <Header currentTab={tab} onChangeTab={setTab} />

        {/* 탭별 화면 */}
        {tab === "game" && <div>🎮 게임 화면</div>}
        {tab === "ranking" && <div>🏆 랭킹 화면</div>}
      </div>
    </ThemeProvider>
  );
}

export default App;
