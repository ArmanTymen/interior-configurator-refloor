import { useMemo } from 'react';
import * as THREE from 'three';
import { Instance, Instances } from '@react-three/drei';
import { useRoomStore } from '../model/store';
import { calculateHerringbone } from '../lib/calculateHerringbone';
import { DEFAULT_PLANK } from '../model/constants';
import { FloorMaterial } from './FloorMaterial';

export const Floor = () => {
  const { width, length } = useRoomStore((s) => s.dimensions);

  const planks = useMemo(
    () => calculateHerringbone({ width, depth: length }, DEFAULT_PLANK),
    [width, length],
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

  const horizontalPlaneGeometry = useMemo<THREE.PlaneGeometry>(() => {
    const geo = new THREE.PlaneGeometry(DEFAULT_PLANK.width, DEFAULT_PLANK.length);
    geo.rotateX(-Math.PI / 2);
    geo.rotateY(Math.PI / 2);

    return geo;
  }, []);

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} renderOrder={-1}>
        <planeGeometry args={[width, length]} />
        <meshBasicMaterial color="#0a0705" toneMapped={false} depthWrite={false} />
      </mesh>

      <Instances
        key={`${width}-${length}`}
        limit={planks.length}
        castShadow={false}
        receiveShadow={true}
        position={[0, 0.001, 0]}
        geometry={horizontalPlaneGeometry}
      >
        <FloorMaterial clippingPlanes={clippingPlanes} />

        {planks.map((p) => {
          const scaleX = Math.max(0, p.size[0] / DEFAULT_PLANK.length);
          const scaleZ = Math.max(0, p.size[2] / DEFAULT_PLANK.width);

          const extendedScale: [number, number, number] = [scaleX, 1, scaleZ];

          return (
            <Instance
              key={p.id}
              position={[p.position[0], 0, p.position[2]]}
              rotation={p.rotation}
              scale={extendedScale}
            />
          );
        })}
      </Instances>
    </group>
  );
};
