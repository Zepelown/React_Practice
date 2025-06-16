import React from 'react';
import { Link } from 'react-router-dom'; // 페이지 이동을 위한 Link 컴포넌트
import PostList from '../components/PostList';

function MainPage(){
    return (
        <div>
            <PostList/>
        </div>
    );
}

export default MainPage