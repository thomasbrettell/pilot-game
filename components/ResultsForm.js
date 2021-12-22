import { firestore } from '../firebaseClient';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import Button from './Button';
import CenterAbs from './CenterAbs';

const addScoreEntry = (score, name) => {
  addDoc(collection(firestore, 'scores'), {
    name,
    score,
    time: serverTimestamp(),
  });
};

const ResultsForm = () => {
  return (
    <CenterAbs>
      <Button>Replay</Button>
    </CenterAbs>
  );
};

export default ResultsForm;
