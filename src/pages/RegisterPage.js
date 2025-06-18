import React from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm'

function RegisterPage() {
    return (
        <div>
            <h1>회원가입</h1>
            <RegisterForm />
        </div>
    );
}

export default RegisterPage;
