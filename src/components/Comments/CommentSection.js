import React, { useState } from 'react';
import styled from 'styled-components';

const CommentsContainer = styled.div`
  margin-top: 16px;
  border-top: 1px solid #eee;
  padding-top: 16px;
`;

const CommentItem = styled.div`
  margin-bottom: 12px;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 8px;
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
`;

const CommentAuthor = styled.span`
  font-weight: bold;
  color: #7695EC;
`;

const CommentTime = styled.span`
  font-size: 12px;
  color: #777;
`;

const CommentContent = styled.p`
  margin: 0;
  font-size: 14px;
`;

const CommentForm = styled.form`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
`;

const CommentInput = styled.textarea`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 10px;
  min-height: 60px;
  resize: vertical;
`;

const CommentButton = styled.button`
  background-color: #7695EC;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 7px 20px;
  cursor: pointer;
  align-self: flex-end;
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  
  &:hover:not(:disabled) {
    background-color: #5f7dd3;
  }
`;

const ToggleCommentsButton = styled.button`
  background: none;
  border: none;
  color: #7695EC;
  cursor: pointer;
  margin-top: 8px;
  font-size: 14px;
  padding: 0;
  text-decoration: underline;
  
  &:hover {
    color: #5f7dd3;
  }
`;

const CommentCount = styled.span`
  font-size: 14px;
  color: #777;
  margin-top: 8px;
`;

const CommentSection = ({ postId, comments = [], username, onAddComment }) => {
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState('');
  const [showAddComment, setShowAddComment] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      onAddComment(postId, comment);
      setComment('');
      setShowAddComment(false);
    }
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  return (
    <CommentsContainer>
      <div>
        <CommentCount>{comments.length} comment{comments.length !== 1 ? 's' : ''}</CommentCount>
        {comments.length > 0 && (
          <ToggleCommentsButton onClick={toggleComments}>
            {showComments ? 'Hide comments' : 'Show comments'}
          </ToggleCommentsButton>
        )}
      </div>
      
      {showComments && comments.length > 0 && (
        <div style={{ marginTop: '10px' }}>
          {comments.map((comment, index) => (
            <CommentItem key={index}>
              <CommentHeader>
                <CommentAuthor>@{comment.username}</CommentAuthor>
                <CommentTime>{formatDate(comment.created_datetime)}</CommentTime>
              </CommentHeader>
              <CommentContent>{comment.content}</CommentContent>
            </CommentItem>
          ))}
        </div>
      )}
      
      {!showAddComment ? (
        <ToggleCommentsButton 
          onClick={() => setShowAddComment(true)}
          style={{ display: 'block', marginTop: '10px' }}
        >
          Add a comment
        </ToggleCommentsButton>
      ) : (
        <CommentForm onSubmit={handleSubmit}>
          <CommentInput
            placeholder="Write your comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <CommentButton 
              type="button" 
              onClick={() => setShowAddComment(false)}
              style={{ background: 'none', color: '#777', border: '1px solid #ccc' }}
            >
              Cancel
            </CommentButton>
            <CommentButton type="submit" disabled={!comment.trim()}>
              Comment
            </CommentButton>
          </div>
        </CommentForm>
      )}
    </CommentsContainer>
  );
};

export default CommentSection;
