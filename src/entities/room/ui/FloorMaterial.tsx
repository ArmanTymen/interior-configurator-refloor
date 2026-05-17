import { useTexture } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useEffect, useMemo } from 'react';
import * as THREE from 'three';

interface WoodTextures {
  map: THREE.Texture;
  normalMap: THREE.Texture;
  roughnessMap: THREE.Texture;
}

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
      texture.repeat.set(1, 1);
      texture.needsUpdate = true;
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
      roughness={0.6}
      metalness={0.0}
      clippingPlanes={clippingPlanes}
      normalScale={new THREE.Vector2(0.8, 0.8)}
      onBeforeCompile={(shader: THREE.WebGLProgramParametersWithUniforms) => {
        shader.vertexShader = shader.vertexShader.replace(
          '#include <uv_vertex>',
          `
        #include <uv_vertex>
        #ifdef USE_UV
          vUv += instanceMatrix[3].xz * 2.0;
        #endif
        `,
        );
      }}
    />
  );
};
