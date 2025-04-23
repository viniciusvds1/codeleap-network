import React from 'react';
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

const ModalText = styled.p`
  font-size: 22px;
  margin-top: 0;
  margin-bottom: 40px;
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
  border: 1px solid #999;
`;

const CancelButton = styled(Button)`
  background-color: white;
  color: black;
`;

const DeleteButton = styled(Button)`
  background-color: #FF5151;
  color: white;
  border: none;
`;

const DeleteModal = ({ onCancel, onConfirm }) => {
  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalText>Are you sure you want to delete this item?</ModalText>
        <ButtonContainer>
          <CancelButton onClick={onCancel}>Cancel</CancelButton>
          <DeleteButton onClick={onConfirm}>Delete</DeleteButton>
        </ButtonContainer>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default DeleteModal;
