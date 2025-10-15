'use client';
import { Card, CardHeader, Avatar, IconButton, CardMedia, CardContent, Typography, CardActions, Link } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { Post, Workspace } from '@/lib/types';
import { useState } from 'react';

interface PostCardProps {
    post: Post;
    workspace: Workspace;
}

const PostCard = ({ post, workspace }: PostCardProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const TRUNCATE_LENGTH = 125;

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    const displayText = isExpanded
        ? post.generatedText
        : `${post.generatedText.substring(0, TRUNCATE_LENGTH)}...`;
    return (
        <Card sx={{
            maxWidth: 345,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
            '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: 6,
            }
        }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: 'secondary.main' }} aria-label="recipe">
                        {workspace.brandName.charAt(0).toUpperCase()}
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={workspace.brandName}
                subheader={new Date(post.createdAt).toLocaleDateString('tr-TR')}
            />
            <CardMedia
                component="img"
                height="345"
                image={post.generatedAssetUrl}
                alt="AI generated content"
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'pre-wrap' }}>
                    {post.generatedText.length > TRUNCATE_LENGTH ? displayText : post.generatedText}
                </Typography>
                {post.generatedText.length > TRUNCATE_LENGTH && (
                    <Link
                        component="button"
                        variant="body2"
                        onClick={toggleExpanded}
                        sx={{ color: 'text.secondary', fontWeight: 'bold', mt: 1 }}
                    >
                        {isExpanded ? 'daha az göster' : 'daha fazla göster'}
                    </Link>
                )}
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteBorderIcon />
                </IconButton>
                <IconButton aria-label="comment">
                    <ChatBubbleOutlineIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <SendOutlinedIcon />
                </IconButton>
                <IconButton aria-label="save" sx={{ marginLeft: 'auto' }}>
                    <BookmarkBorderIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
};

export default PostCard;