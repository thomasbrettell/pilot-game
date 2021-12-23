import styled from 'styled-components';

export default styled.button`
  appearance: none;
  background: none;
  border: 1px solid black;
  border-radius: 3px;
  font-size: 12px;
  cursor: pointer;

  ${p => p.salient && `
    background: black;
    color: white;
    font-weight: bold;
  `}

  &:hover {
    box-shadow: 0 0 3px #888888;
  }
`;
