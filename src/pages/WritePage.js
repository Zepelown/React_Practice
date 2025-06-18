import React from 'react';
import { Link } from 'react-router-dom';
import WritePostForm from '../components/WriteForm';

function WritePage() {
    return (
        <div>
            <h1>글쓰기</h1>
            <WritePostForm />
        </div>
    );
}

export default WritePage;
