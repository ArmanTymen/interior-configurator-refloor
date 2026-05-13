import { useRoomStore } from '@/entities/room';
import { type ChangeEvent } from 'react';

export const ControlsPanel = () => {
  const dimensions = useRoomStore((state) => state.dimensions);
  const setDimensions = useRoomStore((state) => state.setDimensions);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = parseFloat(value) || 0;

    setDimensions({ [name]: numValue });
  };

  return (
    <aside
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '300px',
        height: '100vh',
        backgroundColor: '#f8f9fa',
        padding: '20px',
        boxShadow: '-2px 0 5px rgba(0,0,0,0.1)',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
      }}
    >
      <h2>Параметры комнаты</h2>

      <label style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        Длина (м):
        <input
          type="number"
          name="length"
          value={dimensions.length}
          onChange={handleChange}
          step="0.1"
          min="1"
        />
      </label>

      <label style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        Ширина (м):
        <input
          type="number"
          name="width"
          value={dimensions.width}
          onChange={handleChange}
          step="0.1"
          min="1"
        />
      </label>

      <label style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        Высота (м):
        <input
          type="number"
          name="height"
          value={dimensions.height}
          onChange={handleChange}
          step="0.1"
          min="1"
        />
      </label>
    </aside>
  );
};
