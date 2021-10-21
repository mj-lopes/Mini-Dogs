import styled from "styled-components";

export const Button = ({ children, onClick }) => (
  <Btn onClick={onClick}>{children}</Btn>
);

export const ButtonPhotos = ({ children, onClick }) => (
  <BtnPhotosFetch onClick={onClick}>{children}</BtnPhotosFetch>
);

const Btn = styled.button`
  margin-top: 2rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;

  background-color: #252525;
  color: #eee;

  font-family: "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  font-size: 1rem;
  line-height: 1;

  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: #ff8800;
    color: black;
  }
`;

const BtnPhotosFetch = styled(Btn)`
  border-radius: 100%;
  padding: 0.5rem;
  align-self: flex-end;

  font-weight: bold;
`;
