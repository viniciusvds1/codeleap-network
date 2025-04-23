import React from 'react';
import styled from 'styled-components';
import Tooltip from '../Common/Tooltip';

const LikeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  user-select: none;
`;

const LikeIcon = styled.div`
  color: ${props => props.active ? '#E74C3C' : '#777'};
  transition: all 0.2s ease;
  transform: ${props => props.active ? 'scale(1.1)' : 'scale(1)'};
  
  svg {
    transition: transform 0.2s ease;
  }
  
  &:hover svg {
    transform: scale(1.1);
  }
`;

const LikeCount = styled.span`
  font-size: 14px;
  color: #777;
`;

const LikeButton = ({ active, count, onToggleLike }) => {
  return (
    <Tooltip text={active ? "Unlike this post" : "Like this post"}>
      <LikeContainer onClick={onToggleLike}>
        <LikeIcon active={active}>
          {active ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#E74C3C">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#777" strokeWidth="2">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          )}
        </LikeIcon>
        <LikeCount>{count}</LikeCount>
      </LikeContainer>
    </Tooltip>
  );
};

export default LikeButton;
