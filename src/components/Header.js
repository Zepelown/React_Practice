import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // AuthContext에 정의된 로그아웃 함수 호출
    navigate('/login'); // 로그아웃 후 로그인 페이지로 이동[1][3]
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {/* 로고 또는 앱 이름 */}
        <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, color: 'inherit', textDecoration: 'none' }}>
          My App
        </Typography>
        
        {/* 로그인 상태에 따라 다른 UI를 보여줍니다 */}
        {isAuthenticated ? (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ mr: 2 }}>
              환영합니다, {user?.username}님!
            </Typography>
            <Button color="inherit" onClick={handleLogout}>
              로그아웃
            </Button>
          </Box>
        ) : (
          <Box>
            <Button color="inherit" component={Link} to="/login">
              로그인
            </Button>
            <Button color="inherit" component={Link} to="/register">
              회원가입
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
