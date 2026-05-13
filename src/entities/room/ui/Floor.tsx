import { useMemo } from 'react';
import { calculateHerringbone } from '../lib/calculateHerringbone';

export const Floor = () => {
  const roomConfig = { width: 5, depth: 5 };
  const plankConfig = { width: 0.1, length: 0.6, thickness: 0.01 };

  const planks = useMemo(
    () => calculateHerringbone(roomConfig, plankConfig),
    [roomConfig, plankConfig],
  );

  return (
    <group>
      {planks.map((plank) => (
        <mesh key={plank.id} position={plank.position} rotation={plank.rotation}>
          <boxGeometry args={[plankConfig.length, plankConfig.thickness, plankConfig.width]} />
          <meshStandardMaterial color="#8b4513" />
        </mesh>
      ))}
    </group>
  );
};
