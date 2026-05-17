import { LightConfig } from '@/shared/model/lightTypes';
import { useMemo } from 'react';

export const Lighting = () => {
  const config: LightConfig = useMemo(
    () => ({
      ambientColor: '#ffffff',
      ambientIntensity: 0.7,
      directionalColor: '#fff8f0',
      directionalIntensity: 0.8,
      directionalPosition: [8, 12, 6],
      castShadow: true,
    }),
    [],
  );

  return (
    <group>
      <ambientLight color={config.ambientColor} intensity={config.ambientIntensity} />

      <directionalLight
        color={config.directionalColor}
        intensity={config.directionalIntensity}
        position={config.directionalPosition}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0002}
        shadow-camera-far={40}
        shadow-camera-left={-12}
        shadow-camera-right={12}
        shadow-camera-top={12}
        shadow-camera-bottom={-12}
      />
    </group>
  );
};
