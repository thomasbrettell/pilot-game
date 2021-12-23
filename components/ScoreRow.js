import styled from 'styled-components';

export const Row = styled.div`
  display: flex;
  padding: 10px;
  border: 1px solid black;
  display: flex;
  font-size: 14px;
  background: ${(props) => (props.bg ? props.bg : 'white')};

  & + & {
    border-top: none;
  }

  ${(props) =>
    props.last &&
    `
    border-bottom: none;
  `}

  ${(props) =>
    props.first &&
    `
    border-top: none;
  `}
`;

export const Field = styled.div`
  display: flex;
  width: 100%;
  overflow: auto;

  & + & {
    margin-left: 10px;
  }
`;

const ScoreRow = ({ name, score, rank, bg, last, first }) => {
  return (
    <Row bg={bg} last={last} first={first}>
      <Field>#{rank + 1}</Field>
      <Field>{name || 'Anon'}</Field>
      <Field>{score}</Field>
    </Row>
  );
};

export default ScoreRow;
