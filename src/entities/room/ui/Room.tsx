import { DoubleSide } from 'three';
import { useRoomStore } from '../model/store';
import { Skirting } from './Skirting';

export const Room = () => {
  const { width, length, height } = useRoomStore((state) => state.dimensions);

  const wallMaterialProps = {
    color: '#f0ede6',
    roughness: 0.9,
    metalness: 0.0,
    side: DoubleSide,
  };

  return (
    <group>
      <mesh position={[0, height / 2, -length / 2]} receiveShadow>
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial {...wallMaterialProps} />
      </mesh>

      <mesh position={[0, height / 2, length / 2]} rotation={[0, Math.PI, 0]} receiveShadow>
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial {...wallMaterialProps} />
      </mesh>

      <mesh position={[-width / 2, height / 2, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[length, height]} />
        <meshStandardMaterial {...wallMaterialProps} />
      </mesh>

      <mesh position={[width / 2, height / 2, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[length, height]} />
        <meshStandardMaterial {...wallMaterialProps} />
      </mesh>

      <Skirting />
    </group>
  );
};
