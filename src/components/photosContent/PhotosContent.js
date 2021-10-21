import React from "react";
import { useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";

export const PhotosContent = () => {
  const { list } = useSelector((state) => state.photos);

  return (
    <List>
      {list.map((img) => (
        <Item key={img.id}>
          <ImageDog src={img.src} alt={img.title} />
          <DogName>{img.title}</DogName>
          <DogAccess>{img.acessos}</DogAccess>
        </Item>
      ))}
    </List>
  );
};

const animeLeft = keyframes`
  from {
    transform: translateX(-30px);
  } 
  to {
    transform: translateX(0px);
  }
`;

const List = styled.ul`
  padding: 0px;
  margin: 0px;
  list-style: none;
  width: 100%;
`;

const Item = styled.li`
  display: grid;
  grid-template-columns: 50px 1fr auto;
  grid-template-rows: 50px;

  align-items: center;
  gap: 1rem;
  overflow: hidden;
  margin-bottom: 1rem;

  background: #f9f9f9;
  border-radius: 4px;

  animation: ${animeLeft} 0.3s forwards;
`;

const ImageDog = styled.img`
  max-width: 100%;
`;

const DogName = styled.h2`
  font-family: "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  font-weight: normal;
  font-size: 1.25rem;
  margin: 0px;
`;

const DogAccess = styled.span`
  font-family: monospace;
  font-size: 0.875rem;
  color: #999;
  padding-right: 1rem;
`;
