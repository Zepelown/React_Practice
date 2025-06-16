import React from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm'

function RegisterPage() {
    return (
        <div>
            <h1>회원가입</h1>
            <RegisterForm />
            <p>
                이미 계정이 있으신가요? <Link to="/login">로그인 하러가기</Link>
            </p>
        </div>
    );
}

export default RegisterPage;
