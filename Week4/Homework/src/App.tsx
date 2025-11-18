import { themeClass } from "@/styles/theme.css.ts";
import LoginPage from "@/pages/auth/LoginPage";

function App() {
  return (
    <div className={themeClass}>
      <LoginPage />
    </div>
  );
}

export default App;
