import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // 페이지 이동을 위한 Link 컴포넌트
import LoginForm from '../components/LoginForm';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function LoginPage() {
    const { login, isAuthenticated } = useAuth(); // isAuthenticated를 가져옵니다.
    const navigate = useNavigate();
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/', { replace: true });
        }
    }, [isAuthenticated, navigate]);

    return (
        <div>
            <h1>로그인</h1>
            <LoginForm />
        </div>
    );
}

export default LoginPage;
