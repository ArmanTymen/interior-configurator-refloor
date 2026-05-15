import { useMemo } from 'react';
import { useRoomStore } from '../model/store';
import { SkirtingConfig } from '../model/types';

const EPS = 0.001;

function Skirting() {
  const { width, length } = useRoomStore((s) => s.dimensions);

  const config: SkirtingConfig = useMemo(
    () => ({
      height: 0.1,
      thickness: 0.015,
      color: '#eeeeee',
    }),
    [],
  );

  const { height, thickness, color } = config;

  const adjustedLength = length - thickness * 2;

  return (
    <group>
      <mesh position={[0, height / 2, -length / 2 + thickness / 2 + EPS]} castShadow receiveShadow>
        <boxGeometry args={[width, height, thickness]} />
        <meshStandardMaterial color={color} />
      </mesh>

      <mesh position={[0, height / 2, length / 2 - thickness / 2 - EPS]} castShadow receiveShadow>
        <boxGeometry args={[width, height, thickness]} />
        <meshStandardMaterial color={color} />
      </mesh>

      <mesh
        position={[-width / 2 + thickness / 2 + EPS, height / 2, 0]}
        rotation={[0, Math.PI / 2, 0]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[adjustedLength, height, thickness]} />
        <meshStandardMaterial color={color} />
      </mesh>

      <mesh
        position={[width / 2 - thickness / 2 - EPS, height / 2, 0]}
        rotation={[0, Math.PI / 2, 0]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[adjustedLength, height, thickness]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
}

export default Skirting;
