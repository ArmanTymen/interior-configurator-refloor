import { OrbitControls, Grid } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Floor, Room } from '@/entities/room';
import { ControlsPanel } from '@/widgets/controls';
import { Perf } from 'r3f-perf';

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex' }}>
      <div style={{ flex: 1, background: '#111' }}>
        <Canvas camera={{ position: [10, 10, 10], fov: 45 }}>
          <Perf position="top-left" />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
          <Room />
          <Floor />
          <Grid infiniteGrid fadeDistance={50} cellColor="#444" sectionColor="#666" />
          <OrbitControls makeDefault />
        </Canvas>
      </div>
      <ControlsPanel />
    </div>
  );
}

export default App;
