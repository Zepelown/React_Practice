import React, { useState, useEffect } from 'react';
import Post from './Post';
import { Container, Typography, CircularProgress, Alert, Stack, Box } from '@mui/material';
import { apiClient } from '../context/AuthContext';

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                // 이전 대화에서 백엔드를 수정하여 camelCase로 응답을 보낸다고 가정합니다.
                // 만약 원래대로 Posts(PascalCase)를 쓴다면 response.data.Posts로 수정해주세요.
                const response = await apiClient.get('/main');
                setPosts(response.data.Posts);
            } catch (err) {
                setError('게시글을 불러오는 데 실패했습니다.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    // 로딩 중일 때 원형 프로그레스 바를 보여줍니다.
    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    // 에러 발생 시 에러 메시지를 보여줍니다.
    if (error) {
        return <Alert severity="error" sx={{ mt: 4 }}>{error}</Alert>;
    }

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}> {/* 콘텐츠를 중앙에 정렬하고 최대 너비를 지정 */}
            <Typography variant="h4" component="h1" gutterBottom>
                최신 게시글
            </Typography>
            <Stack spacing={2}> {/* 자식 요소들 사이에 일정한 간격을 줍니다. */}
                {posts.map(post => (
                    // API 응답의 고유 ID를 key로 사용합니다 (예: post.id)
                    <Post key={post.id} post={post} />
                ))}
            </Stack>
        </Container>
    );
};

export default PostList;
