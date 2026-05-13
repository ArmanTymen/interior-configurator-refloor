import { useMemo } from 'react';
import { useRoomStore } from '../model/store';
import { calculateHerringbone } from '../lib/calculateHerringbone';

export const Floor = () => {
  const { width, length } = useRoomStore((s) => s.dimensions);

  const plank = {
    width: 0.1,
    length: 0.6,
    thickness: 0.01,
  };

  const planks = useMemo(
    () => calculateHerringbone({ width, depth: length }, plank),
    [width, length],
  );

  return (
    <group>
      {planks.map((p) => (
        <mesh key={p.id} position={p.position}>
          <boxGeometry args={p.size} />
          <meshStandardMaterial color="#8b4513" />
        </mesh>
      ))}
    </group>
  );
};
