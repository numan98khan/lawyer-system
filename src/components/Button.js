import styled from "styled-components";
const ButtonContainer = styled.button`
  text-transform: capitalize;
  font-size: 1.4rem;
  background: transparent;
  border: 0.05rem solid var(--mainPurple);
  border-color: var(--mainPurple);
  color: var(--mainPurple);
  border-radius: 0.5rem;
  padding: 0.2rem 0.5rem;
  cursor: pointer;
  margin: 0.2rem 0.5rem 0.2rem 0;
  transition: all 0.2s ease-in-out;
  &:hover {
    background: var(--mainPurple);
    color: white;
  }
  &:focus {
    outline: none;
  }
`;
export const MiniButtonContainer = styled.button`
  text-transform: capitalize;
  font-size: 1.0rem;
  background: transparent;
  border: 0.05rem solid var(--mainPurple);
  border-color: var(--mainPurple);
  color: var(--mainPurple);
  border-radius: 0.5rem;
  padding: 0.2rem 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    background: var(--mainPurple);
    color: white;
  }
  &:focus {
    outline: none;
  }
  &.active {
    background: var(--mainPurple);
    color: white;
  }
`;

export default ButtonContainer;