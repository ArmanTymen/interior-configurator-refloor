import { DoubleSide } from 'three';
import { useRoomStore } from '../model/store';

export const Room = () => {
  const { width, length, height } = useRoomStore((state) => state.dimensions);

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[width, length]} />
        <meshStandardMaterial color="#808080" side={DoubleSide} />
      </mesh>

      <mesh position={[0, height / 2, -length / 2]}>
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial color="#e0e0e0" side={DoubleSide} />
      </mesh>

      <mesh position={[0, height / 2, length / 2]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial color="#e0e0e0" side={DoubleSide} />
      </mesh>

      <mesh position={[-width / 2, height / 2, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[length, height]} />
        <meshStandardMaterial color="#d0d0d0" side={DoubleSide} />
      </mesh>

      <mesh position={[width / 2, height / 2, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[length, height]} />
        <meshStandardMaterial color="#d0d0d0" side={DoubleSide} />
      </mesh>
    </group>
  );
};
