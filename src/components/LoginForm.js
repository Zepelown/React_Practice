import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function LoginForm() { // 컴포넌트 이름을 더 명확하게 변경 (선택 사항)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate(); 

    const handleSubmit = async (event) => {
        event.preventDefault();

        // 전송할 데이터 객체 생성
        const data = {
            email: email,
            password: password
        };

        try {
            await login(email, password);
            alert('로그인에 성공했습니다.');
            navigate('/', { replace: true });

        } catch (error) {
            console.error('로그인 요청 중 오류가 발생했습니다:', error);
            alert('로그인에 실패했습니다. 이메일 또는 비밀번호를 확인해주세요.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일 입력"
            />
            <br/>
            <input
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호 입력"
            />
            <br/>
            <button type="submit">로그인</button>
        </form>
    );
}

export default LoginForm;
