import { firestore } from '../firebaseClient';
import {
  addDoc,
  collection,
  serverTimestamp,
  getDocs,
  query,
  orderBy,
} from 'firebase/firestore';
import Button from './Button';
import CenterAbs from './CenterAbs';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import ScoreRow from './ScoreRow';
import { Row, Field } from './ScoreRow';
import LoadingSpinner from './LoadingSpinner';
import { useSelector, useDispatch } from 'react-redux';
import { userActions } from '../store/user-slice';

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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;

const TextInput = styled.input`
  margin: 0 auto 10px;
  display: block;
  padding: 5px;
  border: 1px solid black;
  border-radius: 2px;
  font-family: inherit;

  &::placeholder {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`;

const addScoreEntry = (score, name) => {
  addDoc(collection(firestore, 'scores'), {
    name,
    score,
    time: serverTimestamp(),
  });
};

const ResultsForm = ({ playScore, setGameState, startGame }) => {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.username);
  const [scores, setScores] = useState(null);
  const scoreScrollerRef = useRef();
  const newScoreRef = useRef();

  useEffect(() => {
    const getScores = async () => {
      const scores = [];
      const q = query(
        collection(firestore, 'scores'),
        orderBy('score', 'desc')
      );
      const data = await getDocs(q);
      data.forEach((dp) => scores.push(dp.data()));
      scores.push({
        currentScore: true,
        score: playScore,
      });
      scores.sort((a, b) => {
        if (a.score < b.score) {
          return 1;
        }
        if (a.score > b.score) {
          return -1;
        }
        return 0;
      });
      setScores(scores);
    };
    getScores();
  }, [playScore]);

  const submitHandler = () => {
    addScoreEntry(playScore, username);
    setGameState('NOT_STARTED');
  };

  const startHandler = () => {
    addScoreEntry(playScore, '');
    startGame();
  };

  useEffect(() => {
    if (scores) {
      //this should center the current players score (its a few pixels out atm and i ceebs figuring it why ftm)
      scoreScrollerRef.current.scrollTop =
        newScoreRef.current.offsetTop -
        scoreScrollerRef.current.clientHeight +
        newScoreRef.current.clientHeight;
    }
  }, [scores]);

  return (
    <CenterAbs>
      <Box>
        <TextInput
          placeholder='Enter your name'
          value={username}
          onChange={(e) => dispatch(userActions.SET_USERNAME(e.target.value))}
        />
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
        <OverflowAuto ref={scoreScrollerRef}>
          {scores &&
            scores.map((score, i) => {
              if (score.currentScore) {
                return (
                  <ScoreRow
                    key={i}
                    name={username || 'You'}
                    score={score.score}
                    bg='lightcyan'
                    rank={i}
                    first={i === 0}
                    last={i + 1 === scores.length}
                    ref={newScoreRef}
                  />
                );
              }
              return (
                <ScoreRow
                  key={i}
                  name={score.name}
                  score={score.score}
                  rank={i}
                  first={i === 0}
                  last={i + 1 === scores.length}
                />
              );
            })}
          {!scores && (
            <CenterAbs>
              <LoadingSpinner />
            </CenterAbs>
          )}
        </OverflowAuto>
      </Box>
      <ButtonContainer>
        <Button onClick={submitHandler}>Submit score</Button>
        <Button onClick={startHandler}>Play again</Button>
      </ButtonContainer>
    </CenterAbs>
  );
};

export default ResultsForm;
