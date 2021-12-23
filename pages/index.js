import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import Button from '../components/Button';
import CenterAbs from '../components/CenterAbs';
import ResultsForm from '../components/ResultsForm';
import VStack from '../components/VStack';
import Instructions from '../components/Instructions';
import instructionsImage from '../assets/pilot-game-instructions.svg';
import Image from 'next/image';
import ResultsTable from '../components/ResultsTable';
import Head from 'next/head';

const P5jsComponent = dynamic(() => import('../components/P5Sketch'), {
  ssr: false,
});

export const NOT_STARTED = 'NOT_STARTED';
export const STARTED = 'STARTED';
export const GAME_OVER = 'GAME_OVER';
export const INSTRUCTIONS = 'INSTRUCTIONS';
export const LEADERBOARD = 'LEADERBOARD';

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
    <>
      <Head>
        <title>Pilot Game</title>
        <meta name='description' content='Do your best...' />
      </Head>
      <P5jsComponent
        gameState={gameState}
        points={points}
        timer={timeLeft}
        onGetPoint={handlePoint}
      >
        {gameState === NOT_STARTED && (
          <CenterAbs>
            <VStack>
              <Button onClick={startHandler} salient>
                Start game
              </Button>
              <Button onClick={() => setGameState(INSTRUCTIONS)}>
                Instructions
              </Button>
              <Button onClick={() => setGameState(LEADERBOARD)}>
                Leader board
              </Button>
            </VStack>
          </CenterAbs>
        )}
        {gameState === GAME_OVER && (
          <ResultsForm
            playScore={points}
            setGameState={setGameState}
            startGame={startHandler}
          />
        )}
        {gameState === INSTRUCTIONS && (
          <CenterAbs>
            <Instructions>
              <Image src={instructionsImage} alt='instructions' layout='fill' />
            </Instructions>
            <Button onClick={() => setGameState(NOT_STARTED)}>Close</Button>
          </CenterAbs>
        )}
        {gameState === LEADERBOARD && (
          <CenterAbs>
            <ResultsTable />
            <Button onClick={() => setGameState(NOT_STARTED)}>Close</Button>
          </CenterAbs>
        )}
      </P5jsComponent>
    </>
  );
}
