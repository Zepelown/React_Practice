
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MainPage from './pages/MainPage';
import PostDetailPage from './pages/PostDetailPage';

function App(){
    return (
    <BrowserRouter>
      <Routes>
        {/* 기본 경로(/)로 접속 시 /login으로 자동 이동 */}
        <Route path="/" element={<Navigate to="/main" />} />
        
        {/* /login 경로에 LoginPage 컴포넌트 연결 */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* /signup 경로에 SignUpPage 컴포넌트 연결 */}
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/main" element={<MainPage />} />
        <Route path="/post/:postId" element={<PostDetailPage />} />
      </Routes>
    </BrowserRouter>
    )
}
export default App;