import React from 'react';
import styled from 'styled-components';

// Création du bouton stylisé avec styled-components
const B = styled.button`
  border: 2px solid darksalmon;
  background-color: white;
  border-radius: 5px;
  padding: 10px;
  margin: 0 10px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: darksalmon;
    color: white;
  }
`;

// Définition du composant Button
const Button = (props) => {
  const { label, onClick, type } = props;
  return <B type={type || "button"} onClick={onClick}>{label}</B>;
};

export default Button;
