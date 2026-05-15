import { useMemo } from 'react';
import * as THREE from 'three';
import { Instance, Instances } from '@react-three/drei';
import { useRoomStore } from '../model/store';
import { calculateHerringbone } from '../lib/calculateHerringbone';
import { PlankConfig } from '../model/types';

export const Floor = () => {
  const { width, length } = useRoomStore((s) => s.dimensions);

  const plank = useMemo<PlankConfig>(
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

  const clippingPlanes = useMemo(
    () => [
      new THREE.Plane(new THREE.Vector3(-1, 0, 0), width / 2),
      new THREE.Plane(new THREE.Vector3(1, 0, 0), width / 2),
      new THREE.Plane(new THREE.Vector3(0, 0, -1), length / 2),
      new THREE.Plane(new THREE.Vector3(0, 0, 1), length / 2),
    ],
    [width, length],
  );

  return (
    <Instances key={`${width}-${length}`} limit={planks.length} castShadow receiveShadow={false}>
      <boxGeometry args={[1, 1, 1]} />

      <meshStandardMaterial
        color="#8b4513"
        roughness={0.3}
        metalness={0.05}
        clippingPlanes={clippingPlanes}
      />

      {planks.map((p) => (
        <Instance key={p.id} position={p.position} rotation={p.rotation} scale={p.size} />
      ))}
    </Instances>
  );
};
