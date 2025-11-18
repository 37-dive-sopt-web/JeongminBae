import { Routes, Route, Navigate } from "react-router-dom";
import { themeClass } from "@/styles/theme.css.ts";
import LoginPage from "@/pages/Login/LoginPage";
import SignUpPage from "@/pages/SignUp/SignUpPage";

function App() {
  return (
    <div className={themeClass}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>    
    </div>
  );
}

export default App;

