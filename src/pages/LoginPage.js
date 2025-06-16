import React from 'react';
import { Link } from 'react-router-dom'; // 페이지 이동을 위한 Link 컴포넌트
import LoginForm from '../components/LoginForm';

function LoginPage() {
    return (
        <div>
            <h1>로그인</h1>
            <LoginForm />
            <p>
                계정이 없으신가요? <Link to="/register">회원가입 하러가기</Link>
            </p>
        </div>
    );
}

export default LoginPage;
