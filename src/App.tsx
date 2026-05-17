import { OrbitControls, Grid, Environment, ContactShadows } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Floor, Room } from '@/entities/room';
import { ControlsPanel, Lighting } from '@/widgets/controls';
import { Perf } from 'r3f-perf';

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex' }}>
      <div style={{ flex: 1, background: '#111' }}>
        <Canvas
          camera={{ position: [10, 10, 10], fov: 45 }}
          gl={{
            localClippingEnabled: true,
            toneMappingExposure: 1.2,
          }}
          shadows
          dpr={[1, 2]}
        >
          <Environment preset="warehouse" />
          <Perf position="top-left" />

          <group position={[0, 0.2, 0]}>
            <Room />
            <Floor />
          </group>

          <Lighting />

          <ContactShadows
            position={[0, 0.19, 0]}
            opacity={0.25}
            blur={3}
            scale={25}
            far={0.4}
            resolution={1024}
            frames={1}
          />
          <color attach="background" args={['#dfe6ea']} />
          <Grid infiniteGrid fadeDistance={50} cellColor="#444" sectionColor="#666" />
          <OrbitControls
            makeDefault
            minPolarAngle={0}
            maxPolarAngle={Math.PI / 2.1}
            minDistance={4}
            maxDistance={20}
          />
        </Canvas>
      </div>
      <ControlsPanel />
    </div>
  );
}

export default App;
