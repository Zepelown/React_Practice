import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  // 1. 로딩 중인 경우: 로딩 화면을 보여줍니다.
  //    이 부분이 깜빡임 현상을 방지하는 핵심입니다.
  if (isLoading) {
    return <div>Loading...</div>; // 또는 스피너 컴포넌트
  }

  // 2. 로딩이 끝났지만, 로그인되지 않은 경우: 로그인 페이지로 리디렉션합니다.
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // 3. 로딩이 끝났고, 로그인된 경우: 요청한 페이지를 보여줍니다.
  return <Outlet />; // 자식 라우트(예: 메인 페이지)를 렌더링
};

export default ProtectedRoute;
