import { useState } from 'react';
import ResourcePanel from './ResourcePanel';

const Game = () => {
  const [survivor, setSurvivor] = useState(0);
  const [availableSurvivor, setAvailableSurvivor] = useState(0);
  const [meat, setMeat] = useState(0);
  const [wood, setWood] = useState(0);
  const [stone, setStone] = useState(0);

  return (
    <>
      <ResourcePanel survivor={survivor} availableSurvivor={availableSurvivor} meat={meat} wood={wood} stone={stone} />
    </>
  );
};
export default Game;
