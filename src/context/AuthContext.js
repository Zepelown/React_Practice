// src/context/AuthContext.js

import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

// apiClient를 다른 파일에서 import할 수 있도록 export 해줍니다.
export const apiClient = axios.create({ // <-- 앞에 export 추가!
  baseURL: 'http://localhost:8080', 
});


// 2. Axios 요청 인터셉터 설정 (가장 중요한 부분)
// 이 코드는 모든 API 요청이 보내지기 직전에 가로채서 헤더를 추가하는 역할을 합니다.
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken'); // localStorage에서 토큰을 가져옵니다.
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // 토큰이 있으면 헤더에 추가합니다.
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 앱이 로드될 때, localStorage에 저장된 토큰이 있는지 확인합니다.
    try {
      const token = localStorage.getItem('authToken');
      if (token) {
        const decodedUser = jwtDecode(token);
        // 토큰이 유효한지 확인 (만료 시간 체크)
        if (decodedUser.exp * 1000 > Date.now()) {
            setUser({ username: decodedUser.username, id: decodedUser.sub });
        } else {
            localStorage.removeItem('authToken'); // 만료된 토큰 삭제
        }
      }
    } catch (error) {
        console.error("Invalid token:", error)
    } finally {
        setIsLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    // 3. 로그인 API 호출
    const response = await apiClient.post('/users/login', { email, password });
    const { token } = response.data;

    // 4. 응답으로 받은 토큰을 localStorage에 저장합니다.
    localStorage.setItem('authToken', token);

    // 5. 토큰을 디코딩하여 사용자 정보를 상태에 저장합니다.
    const decodedUser = jwtDecode(token);
    setUser({ username: decodedUser.username, id: decodedUser.sub });
  };

  const logout = () => {
    // 6. localStorage에서 토큰을 제거하고 상태를 초기화합니다.
    localStorage.removeItem('authToken');
    setUser(null);
  };
  
  const isAuthenticated = !!user;
  const value = { user, isAuthenticated, login, logout, isLoading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
