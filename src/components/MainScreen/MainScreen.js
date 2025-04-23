import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import api from '../../services/api';
import DeleteModal from '../Modals/DeleteModal';
import EditModal from '../Modals/EditModal';
import Tooltip from '../Common/Tooltip';
import LikeButton from '../Likes/LikeButton';
import CommentSection from '../Comments/CommentSection';

const MainContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background-color: #FFFFFF;
  min-height: 100vh;
`;

const Header = styled.div`
  background-color: #7695EC;
  color: white;
  padding: 27px;
  font-size: 22px;
  font-weight: bold;
`;

const Content = styled.div`
  padding: 24px;
`;

const CreatePostCard = styled.div`
  border: 1px solid #999999;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
`;

const Title = styled.h2`
  margin-top: 0;
  margin-bottom: 24px;
  font-size: 22px;
  font-weight: 700;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #777;
  border-radius: 8px;
  font-size: 14px;
  margin-bottom: 16px;
  box-sizing: border-box;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 8px;
  border: 1px solid #777;
  border-radius: 8px;
  font-size: 14px;
  margin-bottom: 16px;
  min-height: 80px;
  box-sizing: border-box;
  resize: vertical;
`;

const Button = styled.button`
  background-color: #7695EC;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 7px 30px;
  font-size: 16px;
  cursor: pointer;
  float: right;
  
  &:disabled {
    background-color: #CCCCCC;
    cursor: not-allowed;
  }
`;

const PostCard = styled.div`
  border: 1px solid #999999;
  border-radius: 16px;
  margin-bottom: 24px;
  overflow: hidden;
`;

const PostHeader = styled.div`
  background-color: #7695EC;
  color: white;
  padding: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PostTitle = styled.h3`
  margin: 0;
  font-size: 22px;
  font-weight: 700;
  color: white;
`;

const PostContent = styled.div`
  padding: 24px;
`;

const PostInfo = styled.div`
  display: flex;
  justify-content: space-between;
  color: #777777;
  margin-bottom: 16px;
  font-size: 18px;
`;

const PostActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  border-top: 1px solid #eee;
  padding-top: 10px;
`;

const PostText = styled.p`
  margin: 0;
  font-size: 18px;
`;

const IconContainer = styled.div`
  display: flex;
  gap: 16px;
`;

// Icon component was removed as SVGs are used directly

const MainScreen = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [userLikes, setUserLikes] = useState({});
  const username = localStorage.getItem('username');
  const navigate = useNavigate();

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      const data = await api.getPosts();
      
      // Initialize likes and comments if they don't exist in the API response
      const postsWithSocialFeatures = data.results.map(post => ({
        ...post,
        likes: post.likes || 0,
        likedBy: post.likedBy || [],
        comments: post.comments || []
      }));
      
      setPosts(postsWithSocialFeatures);
      
      // Set up user likes state
      const newUserLikes = {};
      postsWithSocialFeatures.forEach(post => {
        newUserLikes[post.id] = post.likedBy && post.likedBy.includes(username);
      });
      setUserLikes(newUserLikes);
      
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
      setLoading(false);
    }
  }, [username]);
  
  useEffect(() => {
    // Redirect to signup if username is not set
    if (!username) {
      navigate('/');
      return;
    }
    
    fetchPosts();
  }, [username, navigate, fetchPosts]);

  // This function definition has been moved above the useEffect and wrapped in useCallback

  const handleCreatePost = async (e) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) return;

    const postData = {
      username,
      title: title.trim(),
      content: content.trim()
    };

    try {
      await api.createPost(postData);
      setTitle('');
      setContent('');
      fetchPosts();
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  };

  const openDeleteModal = (post) => {
    setCurrentPost(post);
    setShowDeleteModal(true);
  };

  const openEditModal = (post) => {
    setCurrentPost(post);
    setShowEditModal(true);
  };

  const handleDelete = async () => {
    if (!currentPost) return;
    
    try {
      await api.deletePost(currentPost.id);
      setShowDeleteModal(false);
      fetchPosts();
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };

  const handleEdit = async (editedTitle, editedContent) => {
    if (!currentPost) return;
    
    try {
      await api.updatePost(currentPost.id, {
        title: editedTitle,
        content: editedContent
      });
      setShowEditModal(false);
      fetchPosts();
    } catch (error) {
      console.error('Failed to update post:', error);
    }
  };
  
  const handleToggleLike = async (postId) => {
    // Optimistic UI update
    const isCurrentlyLiked = userLikes[postId] || false;
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: isCurrentlyLiked ? post.likes - 1 : post.likes + 1,
          likedBy: isCurrentlyLiked
            ? post.likedBy.filter(user => user !== username)
            : [...post.likedBy, username]
        };
      }
      return post;
    });
    
    setPosts(updatedPosts);
    setUserLikes(prev => ({
      ...prev,
      [postId]: !isCurrentlyLiked
    }));
    
    try {
      await api.toggleLike(postId, !isCurrentlyLiked);
    } catch (error) {
      console.error('Failed to toggle like:', error);
      // Revert changes if the API call fails
      fetchPosts();
    }
  };
  
  const handleAddComment = async (postId, commentText) => {
    try {
      await api.addComment(postId, {
        username,
        content: commentText
      });
      fetchPosts();
    } catch (error) {
      console.error('Failed to add comment:', error);
    }
  };

  // Format the date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffDay > 0) {
      return `${diffDay} day${diffDay > 1 ? 's' : ''} ago`;
    } else if (diffHour > 0) {
      return `${diffHour} hour${diffHour > 1 ? 's' : ''} ago`;
    } else if (diffMin > 0) {
      return `${diffMin} minute${diffMin > 1 ? 's' : ''} ago`;
    } else {
      return 'just now';
    }
  };

  return (
    <MainContainer>
      <Header>CodeLeap Network</Header>
      <Content>
        <CreatePostCard>
          <Title>What's on your mind?</Title>
          <form onSubmit={handleCreatePost}>
            <div>
              <label htmlFor="title">Title</label>
              <Input
                id="title"
                placeholder="Hello world"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="content">Content</label>
              <TextArea
                id="content"
                placeholder="Content here"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <Button type="submit" disabled={!title.trim() || !content.trim()}>
              Create
            </Button>
          </form>
        </CreatePostCard>

        {loading ? (
          <p>Loading posts...</p>
        ) : (
          posts.map((post) => (
            <PostCard key={post.id}>
              <PostHeader>
                <PostTitle>{post.title}</PostTitle>
                {post.username === username && (
                  <IconContainer>
                    <Tooltip text="Delete post">
                      <div onClick={() => openDeleteModal(post)} style={{cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.2)', margin: '0 4px'}}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          <line x1="10" y1="11" x2="10" y2="17"></line>
                          <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                      </div>
                    </Tooltip>
                    <Tooltip text="Edit post">
                      <div onClick={() => openEditModal(post)} style={{cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.2)', margin: '0 4px'}}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                      </div>
                    </Tooltip>
                  </IconContainer>
                )}
              </PostHeader>
              <PostContent>
                <PostInfo>
                  <span>@{post.username}</span>
                  <span>{formatDate(post.created_datetime)}</span>
                </PostInfo>
                <PostText>{post.content}</PostText>
                
                <PostActions>
                  <LikeButton 
                    active={userLikes[post.id] || false}
                    count={post.likes || 0}
                    onToggleLike={() => handleToggleLike(post.id)}
                  />
                  <Tooltip text="Share post">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#777" style={{cursor: 'pointer'}}>
                      <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
                    </svg>
                  </Tooltip>
                </PostActions>
                
                <CommentSection 
                  postId={post.id}
                  comments={post.comments || []}
                  username={username}
                  onAddComment={handleAddComment}
                />
              </PostContent>
            </PostCard>
          ))
        )}
      </Content>

      {showDeleteModal && currentPost && (
        <DeleteModal 
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={handleDelete}
        />
      )}

      {showEditModal && currentPost && (
        <EditModal
          post={currentPost}
          onCancel={() => setShowEditModal(false)}
          onSave={handleEdit}
        />
      )}
    </MainContainer>
  );
};

export default MainScreen;
