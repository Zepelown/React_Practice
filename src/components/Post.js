import React from 'react';
import { Card, CardActionArea, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅을 import 합니다.

const Post = ({ post }) => {
  const navigate = useNavigate(); // useNavigate 훅을 초기화합니다.

  // 카드를 클릭했을 때 실행될 함수
  const handleCardClick = () => {
    // '/post/' 뒤에 실제 post의 id를 붙여서 해당 경로로 이동시킵니다.
    navigate(`/post/${post.id}`);
  };

  return (
    
    <CardActionArea component="div" onClick={handleCardClick}>
      <Card sx={{ marginBottom: 2 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {post.title}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            작성자: {post.username}
          </Typography>
          <Typography variant="body2" noWrap> {/* noWrap으로 내용이 길면 ...으로 표시 */}
            {post.content}
          </Typography>
        </CardContent>
      </Card>
    </CardActionArea>
  );
};

export default Post;
