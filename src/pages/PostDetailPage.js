// src/pages/PostDetailPage.js

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  CircularProgress, 
  Alert, 
  Paper, 
  Box, 
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  TextField
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { apiClient } from '../context/AuthContext';

const PostDetailPage = () => {
  // --- 기존 코드와 동일한 부분 ---
  const { postId } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]); // 댓글 목록을 저장할 상태 추가
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // --- 새로 추가된 상태 ---
  const [newComment, setNewComment] = useState(''); // 새 댓글 입력 상태
  const [isSubmitting, setIsSubmitting] = useState(false); // 댓글 등록 중 상태

  useEffect(() => {
    const fetchPostAndComments = async () => {
      setLoading(true);
      try {
        // API 요청으로 게시글과 댓글 데이터를 함께 받아옵니다.
        const response = await apiClient.get(`/post/${postId}`);
        setPost(response.data.Post);
        setComments(response.data.Comment || []); // Comment가 없을 경우 빈 배열로 초기화
      } catch (err) {
        setError('게시글과 댓글을 불러오는 데 실패했습니다.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPostAndComments();
  }, [postId]);

  // --- 댓글 제출 핸들러 함수 (새로 추가) ---
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) {
      alert('댓글 내용을 입력해주세요.');
      return;
    }
    
    setIsSubmitting(true);
    try {
      // POST /post/{postId}/comment API 호출
      const response = await apiClient.post(`/post/${postId}/comment`, {
        content: newComment,
        date: new Date()
      });

      // API 응답으로 받은 새 댓글 데이터를 기존 댓글 목록에 추가
      setComments(prevComments => [...prevComments, response.data]);
      setNewComment(''); // 입력창 초기화
    } catch (err) {
      setError('댓글 등록에 실패했습니다. 잠시 후 다시 시도해주세요.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- 기존 코드와 동일한 부분 ---
  const handleBackClick = () => {
    navigate(-1); // '/ ' 대신 -1을 사용하면 바로 이전 페이지로 이동하여 더 유연합니다.
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  // 에러 메시지를 좀 더 구체적으로 보여줄 수 있도록 수정
  if (error) {
    return <Alert severity="error" sx={{ mt: 4 }}>{error}</Alert>;
  }

  if (!post) {
    return <Typography variant="h6" sx={{ mt: 4 }}>게시글을 찾을 수 없습니다.</Typography>;
  }

  // --- JSX 렌더링 부분 (댓글 관련 UI 추가) ---
  return (
    <Container sx={{ mt: 4, maxWidth: 'md' }}>
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={handleBackClick}
        sx={{ mb: 2 }}
      >
        목록으로
      </Button>

      {/* 게시글 영역 */}
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          {post.title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          작성자: {post.username} | 작성일: {new Date(post.date).toLocaleDateString()}
        </Typography>
        <Divider sx={{ my: 3 }} />
        <Typography variant="body1" sx={{ mt: 3, whiteSpace: 'pre-wrap', minHeight: '150px' }}>
          {post.content}
        </Typography>
      </Paper>

      {/* 댓글 영역 */}
      <Box sx={{ mt: 5 }}>
        <Typography variant="h5" gutterBottom>
          댓글 ({comments.length})
        </Typography>
        
        {/* 댓글 작성 폼 */}
        <Box component="form" onSubmit={handleCommentSubmit} sx={{ my: 3 }}>
          <TextField
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            label="댓글을 입력하세요"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            disabled={isSubmitting}
          />
          <Button 
            type="submit" 
            variant="contained" 
            sx={{ mt: 1 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? '등록 중...' : '댓글 등록'}
          </Button>
        </Box>

        {/* 댓글 목록 */}
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <React.Fragment key={comment.id}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar>{comment.username.charAt(0).toUpperCase()}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={<strong>{comment.username}</strong>}
                    secondary={
                      <>
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.primary"
                          sx={{ display: 'block', whiteSpace: 'pre-wrap', my: 0.5 }}
                        >
                          {comment.content}
                        </Typography>
                        {new Date(comment.date).toLocaleString()}
                      </>
                    }
                  />
                </ListItem>
                {index < comments.length - 1 && <Divider variant="inset" component="li" />}
              </React.Fragment>
            ))
          ) : (
            <Typography sx={{ p: 2, color: 'text.secondary' }}>아직 댓글이 없습니다.</Typography>
          )}
        </List>
      </Box>
    </Container>
  );
};

export default PostDetailPage;
