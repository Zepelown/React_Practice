import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 임포트

function RegisterForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // navigate 함수 생성

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("test")
        const data = { name, email, password }; // ES6 축약 문법 사용

        try {
            const response = await axios.post('http://localhost:8080/users/register', data);

            // 성공 상태 코드가 201 (Created) 또는 200 (OK)일 경우 처리
            if (response.status === 201 || response.status === 200) { 
                alert('회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.');
                navigate('/login'); // React Router를 이용한 페이지 이동
            } else {
                // 예상치 못한 성공 코드가 온 경우
                alert(`회원가입은 되었지만, 예상치 못한 응답(Status: ${response.status})을 받았습니다.`);
            }
        } catch (error) {
            console.error('회원가입 요청 오류:', error);
            // 서버가 구체적인 에러 메시지를 보냈을 경우 이를 활용
            const errorMessage = error.response?.data?.message || '회원가입에 실패했습니다. 서버 로그를 확인해주세요.';
            alert(errorMessage);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="이름" required />
            <br />
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="이메일" required />
            <br />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="비밀번호" required />
            <br />
            <button 
                type="submit"
                onClick={()=> console.log("버튼 클릭 됨!")}
            >
                회원가입
            </button>
        </form>
    );
}

export default RegisterForm;
