import { useTexture } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { WoodTextures } from '../model/types';

interface FloorMaterialProps {
  readonly clippingPlanes: THREE.Plane[];
}

export const FloorMaterial = ({ clippingPlanes }: FloorMaterialProps) => {
  const { gl } = useThree();
  const loadedTextures = useTexture({
    map: '/textures/color.jpg',
    normalMap: '/textures/nor.jpg',
    roughnessMap: '/textures/rough.jpg',
  });

  const clonedTextures = useMemo<WoodTextures>(() => {
    const maxAnisotropy = gl.capabilities.getMaxAnisotropy();

    const cloned = {
      map: loadedTextures.map.clone(),
      normalMap: loadedTextures.normalMap.clone(),
      roughnessMap: loadedTextures.roughnessMap.clone(),
    };

    Object.values(cloned).forEach((texture: THREE.Texture) => {
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.anisotropy = maxAnisotropy;
      texture.repeat.set(0.35, 0.35);
      texture.needsUpdate = true;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      texture.magFilter = THREE.LinearFilter;
    });

    cloned.map.colorSpace = THREE.SRGBColorSpace;
    return cloned;
  }, [loadedTextures, gl]);

  useEffect(() => {
    return () => {
      clonedTextures.map.dispose();
      clonedTextures.normalMap.dispose();
      clonedTextures.roughnessMap.dispose();
    };
  }, [clonedTextures]);

  return (
    <meshStandardMaterial
      map={clonedTextures.map}
      normalMap={clonedTextures.normalMap}
      roughnessMap={clonedTextures.roughnessMap}
      roughness={0.85}
      metalness={0.0}
      clippingPlanes={clippingPlanes}
      normalScale={new THREE.Vector2(0.35, 0.35)}
    />
  );
};
