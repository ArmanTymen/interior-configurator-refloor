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
          gl={{ localClippingEnabled: true }}
          shadows
        >
          <Environment preset="apartment" />
          <Perf position="top-left" />
          <Room />
          <Floor />
          <Lighting />
          <ContactShadows
            position={[0, -0.01, 0]}
            opacity={0.4}
            blur={2}
            scale={20}
            far={0.1}
            resolution={1024}
            color="#000000"
          />
          <color attach="background" args={['#202020']} />
          <Grid infiniteGrid fadeDistance={50} cellColor="#444" sectionColor="#666" />
          <OrbitControls makeDefault />
        </Canvas>
      </div>
      <ControlsPanel />
    </div>
  );
}

export default App;
