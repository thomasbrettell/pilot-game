import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import Button from '../components/Button';
import CenterAbs from '../components/CenterAbs';
import ResultsForm from '../components/ResultsForm';

const P5jsComponent = dynamic(() => import('../components/P5Sketch'), {
  ssr: false,
});

export const NOT_STARTED = 'NOT_STARTED';
export const STARTED = 'STARTED';
export const GAME_OVER = 'GAME_OVER';

const INTERVAL_TIME = 4;

export default function Home() {
  const [gameState, setGameState] = useState(NOT_STARTED);
  const [timeLeft, setTimeLeft] = useState(INTERVAL_TIME);
  const [points, setPoints] = useState(0);

  const startHandler = () => {
    setGameState(STARTED);
    setTimeLeft(INTERVAL_TIME);
    setPoints(0);
  };

  const handlePoint = () => {
    setTimeLeft(INTERVAL_TIME);
    setPoints(points + 1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      console.log('ok');
      if (gameState === STARTED) {
        setTimeLeft(timeLeft - 1);
        if (timeLeft - 1 <= 0) {
          setGameState(GAME_OVER);
        }
      }
    }, 1000);

    if (gameState !== STARTED) {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [timeLeft, gameState]);

  return (
    <P5jsComponent
      gameState={gameState}
      setGameState={setGameState}
      points={points}
      timer={timeLeft}
      onGetPoint={handlePoint}
    >
      {gameState === NOT_STARTED && (
        <CenterAbs>
          <Button onClick={startHandler}>Start game</Button>
        </CenterAbs>
      )}
      {gameState === GAME_OVER && <ResultsForm />}
    </P5jsComponent>
  );
}
