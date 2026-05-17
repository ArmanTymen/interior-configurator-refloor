import { DoubleSide } from 'three';
import { useRoomStore } from '../model/store';
import { Skirting } from './Skirting';

const WALL_THICKNESS = 0.1;

export const Room = () => {
  const { width, length, height } = useRoomStore((state) => state.dimensions);

  const wallMaterialProps = {
    color: '#f5f2eb',
    roughness: 1,
    metalness: 0,
    side: DoubleSide,
  };

  const fullWidth = width + WALL_THICKNESS * 2;

  return (
    <group>
      <mesh position={[0, height / 2, -length / 2 - WALL_THICKNESS / 2]} receiveShadow>
        <boxGeometry args={[fullWidth, height, WALL_THICKNESS]} />
        <meshStandardMaterial {...wallMaterialProps} />
      </mesh>

      <mesh
        position={[0, height / 2, length / 2 + WALL_THICKNESS / 2]}
        rotation={[0, Math.PI, 0]}
        receiveShadow
      >
        <boxGeometry args={[fullWidth, height, WALL_THICKNESS]} />
        <meshStandardMaterial {...wallMaterialProps} />
      </mesh>

      <mesh
        position={[-width / 2 - WALL_THICKNESS / 2, height / 2, 0]}
        rotation={[0, Math.PI / 2, 0]}
        receiveShadow
      >
        <boxGeometry args={[length, height, WALL_THICKNESS]} />
        <meshStandardMaterial {...wallMaterialProps} />
      </mesh>

      <mesh
        position={[width / 2 + WALL_THICKNESS / 2, height / 2, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        receiveShadow
      >
        <boxGeometry args={[length, height, WALL_THICKNESS]} />
        <meshStandardMaterial {...wallMaterialProps} />
      </mesh>

      <Skirting />
    </group>
  );
};
