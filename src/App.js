import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MainPage from './pages/MainPage';
import PostDetailPage from './pages/PostDetailPage';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import RootLayout from './pages/RootLayout'; // RootLayout을 import 합니다.
import WritePostForm from './components/WriteForm';

const router = createBrowserRouter([
  {
    // 모든 경로의 부모가 될 RootLayout을 설정합니다.
    path: '/',
    element: <RootLayout />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          {
            index: true,
            element: <MainPage />,
          },
          {
            path: 'post/:postId',
            element: <PostDetailPage />,
          },
          {
            path: 'post',
            element: <WritePostForm/>
          }
        ],
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      }
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
export default App;
