import { useMemo } from 'react';
import * as THREE from 'three';
import { Instance, Instances } from '@react-three/drei';
import { useRoomStore } from '../model/store';
import { calculateHerringbone } from '../lib/calculateHerringbone';

export const Floor = () => {
  const { width, length } = useRoomStore((s) => s.dimensions);

  const plank = useMemo(
    () => ({
      width: 0.1,
      length: 0.6,
      thickness: 0.01,
    }),
    [],
  );

  const planks = useMemo(
    () => calculateHerringbone({ width, depth: length }, plank),
    [width, length, plank],
  );

  const clippingPlanes = useMemo(() => {
    return [
      new THREE.Plane(new THREE.Vector3(-1, 0, 0), width / 2),
      new THREE.Plane(new THREE.Vector3(1, 0, 0), width / 2),
      new THREE.Plane(new THREE.Vector3(0, 0, -1), length / 2),
      new THREE.Plane(new THREE.Vector3(0, 0, 1), length / 2),
    ];
  }, [width, length]);

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.00001, 0]}>
        <planeGeometry args={[width, length]} />
        <meshStandardMaterial color="#222" />
      </mesh>
      <Instances key={`${width}-${length}`} limit={planks.length}>
        <boxGeometry args={[1, 1, 1]} />

        <meshStandardMaterial color="#8b4513" clippingPlanes={clippingPlanes} />

        {planks.map((p) => (
          <Instance key={p.id} position={p.position} rotation={p.rotation} scale={p.size} />
        ))}
      </Instances>
    </group>
  );
};
