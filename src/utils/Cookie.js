import { Cookies } from "react-cookie";

const cookies = new Cookies();

// 쿠키를 저장하는 함수
export const setCookie = (name, value, options) => {
  return cookies.set(name, value, { ...options });
};

// 쿠키를 조회하는 함수
export const getCookie = (name) => {
  return cookies.get(name);
};

// 쿠키를 삭제하는 함수
export const removeCookie = (name, options) => {
  return cookies.remove(name, { ...options });
};
