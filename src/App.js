
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App(){
    return (
    <BrowserRouter>
      <Routes>
        {/* 기본 경로(/)로 접속 시 /login으로 자동 이동 */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        {/* /login 경로에 LoginPage 컴포넌트 연결 */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* /signup 경로에 SignUpPage 컴포넌트 연결 */}
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
    )
}
export default App;