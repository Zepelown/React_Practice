import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../context/AuthContext';

// Material-UI imports
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack'; // Stack을 사용하여 버튼을 정렬합니다.
import CreateIcon from '@mui/icons-material/Create'; // 아이콘 추가

function WritePostForm() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        // 간단한 유효성 검사
        if (!title.trim() || !content.trim()) {
            alert('제목과 내용을 모두 입력해주세요.');
            return;
        }

        const postData = {
            title: title,
            content: content,
            date: new Date(),
            category : "test"
            // author: '...' // 필요하다면 작성자 정보도 추가할 수 있습니다.
        };

        try {
            // 서버의 게시글 생성 API 엔드포인트로 요청을 보냅니다. (URL은 예시입니다)
            // const response = await axios.post('http://localhost:8080/post', postData);
            const response = await apiClient.post('/post',postData)

            if (response.status === 200) { // 201 Created
                alert('게시글이 성공적으로 작성되었습니다.');
                // 작성된 게시글 상세 페이지나 목록 페이지로 이동합니다.
                // 예시: response.data.id가 새로 생성된 게시글의 ID라고 가정
                navigate(`/post/${response.data.id}`); 
            }
        } catch (error) {
            console.error('게시글 작성 중 오류 발생:', error);
            alert('게시글 작성에 실패했습니다.');
        }
    };
    
    // 취소 또는 뒤로가기 핸들러
    const handleCancel = () => {
        // 사용자가 정말 취소할 것인지 확인할 수 있습니다.
        if (window.confirm('작성을 취소하시겠습니까? 변경사항이 저장되지 않습니다.')) {
            navigate(-1); // 이전 페이지로 이동
        }
    };

    return (
        <Container component="main" maxWidth="md">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h4" gutterBottom>
                    새 글 작성하기
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3, width: '100%' }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="title"
                        label="제목"
                        name="title"
                        autoFocus
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="글의 제목을 입력하세요"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="content"
                        label="내용"
                        name="content"
                        multiline // 여러 줄 입력을 가능하게 합니다.
                        rows={15} // 최소 15줄의 높이를 가집니다.
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="내용을 입력하세요..."
                    />
                    <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 3 }}>
                        <Button 
                            variant="outlined" 
                            onClick={handleCancel}
                        >
                            취소
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            startIcon={<CreateIcon />}
                        >
                            작성 완료
                        </Button>
                    </Stack>
                </Box>
            </Box>
        </Container>
    );
}

export default WritePostForm;
