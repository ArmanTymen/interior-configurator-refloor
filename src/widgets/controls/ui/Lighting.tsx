import { LightConfig } from '@/shared/model/lightTypes';
import { useMemo } from 'react';

export const Lighting = () => {
  const config: LightConfig = useMemo(
    () => ({
      ambientColor: '#ffffff',
      ambientIntensity: 0.6,
      directionalColor: '#ffffff',
      directionalIntensity: 1.5,
      directionalPosition: [5, 10, 5],
      castShadow: true,
    }),
    [],
  );

  return (
    <group>
      <ambientLight color={config.ambientColor} intensity={config.ambientIntensity} />

      <directionalLight
        {...config}
        position={config.directionalPosition}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0001}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
    </group>
  );
};
