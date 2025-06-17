import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import { Container } from '@mui/material';

const RootLayout = () => {
  return (
    <>
      <Header />
      <main>
        {/* 이 Outlet 부분에 페이지별 컴포넌트(MainPage, PostDetailPage 등)가 렌더링됩니다. */}
        <Container sx={{ mt: 2 }}>
          <Outlet />
        </Container>
      </main>
    </>
  );
};

export default RootLayout;
