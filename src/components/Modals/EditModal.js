import React, { useState } from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(2px);
  animation: fadeIn 0.2s ease-in-out;
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const ModalContainer = styled.div`
  background-color: white;
  border-radius: 16px;
  padding: 24px;
  width: 100%;
  max-width: 660px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ModalTitle = styled.h2`
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
  margin-bottom: 24px;
  min-height: 80px;
  box-sizing: border-box;
  resize: vertical;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 16px;
`;

const Button = styled.button`
  border-radius: 8px;
  padding: 7px 30px;
  font-size: 16px;
  cursor: pointer;
  font-weight: 700;
`;

const CancelButton = styled(Button)`
  background-color: white;
  color: black;
  border: 1px solid #999;
`;

const SaveButton = styled(Button)`
  background-color: #47B960;
  color: white;
  border: none;
  
  &:disabled {
    background-color: #CCCCCC;
    cursor: not-allowed;
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 16px;
`;

const EditModal = ({ post, onCancel, onSave }) => {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      onSave(title, content);
    }
  };

  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalTitle>Edit item</ModalTitle>
        <form onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="edit-title">Title</Label>
            <Input
              id="edit-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="edit-content">Content</Label>
            <TextArea
              id="edit-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <ButtonContainer>
            <CancelButton type="button" onClick={onCancel}>
              Cancel
            </CancelButton>
            <SaveButton 
              type="submit" 
              disabled={!title.trim() || !content.trim()}
            >
              Save
            </SaveButton>
          </ButtonContainer>
        </form>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default EditModal;
