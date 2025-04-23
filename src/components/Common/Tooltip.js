import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const TooltipContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const TooltipText = styled.span`
  visibility: ${props => props.visible ? 'visible' : 'hidden'};
  background-color: #555;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 10px;
  position: fixed;
  z-index: 1000;
  opacity: ${props => props.visible ? 1 : 0};
  transition: opacity 0.3s;
  white-space: nowrap;
  font-size: 14px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  pointer-events: none;
  
  &:after {
    content: "";
    position: absolute;
    border-width: 5px;
    border-style: solid;
    border-color: #555 transparent transparent transparent;
  }
`;

const Tooltip = ({ children, text }) => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const targetRef = useRef(null);
  
  const handleMouseEnter = () => {
    if (!targetRef.current) return;
    
    const rect = targetRef.current.getBoundingClientRect();
    const tooltipTop = rect.top - 10; // Position above the element with some margin
    const tooltipLeft = rect.left + rect.width / 2; // Center horizontally
    
    setPosition({ top: tooltipTop, left: tooltipLeft });
    setVisible(true);
  };
  
  const handleMouseLeave = () => {
    setVisible(false);
  };
  
  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;
    
    target.addEventListener('mouseenter', handleMouseEnter);
    target.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      target.removeEventListener('mouseenter', handleMouseEnter);
      target.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  
  return (
    <TooltipContainer ref={targetRef}>
      {children}
      <TooltipText 
        visible={visible} 
        style={{
          top: position.top + 'px',
          left: position.left + 'px',
          transform: 'translate(-50%, -100%)'
        }}
      >
        {text}
      </TooltipText>
    </TooltipContainer>
  );
};

export default Tooltip;
