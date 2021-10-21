import styled from "styled-components";

export const Input = ({ value, onChange, children, type }) => (
  <Label>
    {children}
    <InputEl type={type} value={value} onChange={onChange} />
  </Label>
);

const InputEl = styled.input`
  display: block;
  margin-top: 0.25rem;
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  box-sizing: border-box;

  border: 3px solid #666;
  border-radius: 4px;
  color: black;
  outline: none;

  font-family: "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  width: 100%;

  transition: 0.3s;

  &:hover {
    border: 3px solid #ff8800;
  }
  &:focus {
    border: 3px solid #ff8800;
    box-shadow: 0 0 4px #ff8800;
  }
`;

const Label = styled.label`
  color: #252525;
  font-family: "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
`;
