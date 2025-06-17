import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // URL 파라미터를 가져오기 위한 훅
import { Container, Typography, CircularProgress, Alert, Paper, Box } from '@mui/material';
import { apiClient } from '../context/AuthContext';

const PostDetailPage = () => {
  // useParams를 사용해 URL의 ':postId' 값을 가져옵니다.
  const { postId } = useParams(); 
  
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        // postId를 이용해 특정 게시글 하나만 요청하는 API를 호출합니다.
        // const response = await apiClient.get('/main');
        const response = await apiClient.get(`/post/${postId}`);
        setPost(response.data.Post);
      } catch (err) {
        setError('게시글을 불러오는 데 실패했습니다.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]); // postId가 바뀔 때마다 useEffect가 다시 실행됩니다.

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error" sx={{ mt: 4 }}>{error}</Alert>;
  }

  // post 데이터가 없을 경우 (예: 잘못된 ID)
  if (!post) {
    return <Typography variant="h6">게시글을 찾을 수 없습니다.</Typography>;
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          {post.title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          작성자: {post.username} | 작성일: {new Date(post.date).toLocaleDateString()}
        </Typography>
        <Typography variant="body1" sx={{ mt: 3, whiteSpace: 'pre-wrap' }}>
          {post.content}
        </Typography>
      </Paper>
    </Container>
  );
};

export default PostDetailPage;
