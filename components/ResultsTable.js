import styled from 'styled-components';
import ScoreRow, { Row, Field } from './ScoreRow';
import { firestore } from '../firebaseClient';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import CenterAbs from './CenterAbs';
import LoadingSpinner from './LoadingSpinner';
import React, { useState, useEffect } from 'react';

const Box = styled.div`
  background: white;
  border: 1px solid black;
  padding: 10px;
  width: 300px;
  min-height: 300px;
`;

const OverflowAuto = styled.div`
  overflow: auto;
  max-height: 222px;
  border-bottom: 1px solid black;
`;

const ResultsTable = () => {
  const [scores, setScores] = useState(null);

  useEffect(() => {
    const getScores = async () => {
      const scores = [];
      const q = query(
        collection(firestore, 'scores'),
        orderBy('score', 'desc')
      );
      const data = await getDocs(q);
      data.forEach((dp) => scores.push(dp.data()));
      setScores(scores);
    };
    getScores();
  }, []);

  return (
    <Box>
      <Row>
        <Field>
          <strong>Rank</strong>
        </Field>
        <Field>
          <strong>Name</strong>
        </Field>
        <Field>
          <strong>Score</strong>
        </Field>
      </Row>
      <OverflowAuto>
        {scores &&
          scores.map((score, i) => (
            <ScoreRow
              key={i}
              name={score.name}
              score={score.score}
              rank={i}
              first={i === 0}
              last={i + 1 === scores.length}
            />
          ))}
        {!scores && (
          <CenterAbs>
            <LoadingSpinner />
          </CenterAbs>
        )}
      </OverflowAuto>
    </Box>
  );
};

export default ResultsTable;
