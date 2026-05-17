import { useRoomStore } from '@/entities/room';
import { calculateRoomMetrics } from '@/entities/room/lib/calculateMetrics';
import { type ChangeEvent, useMemo } from 'react';

type DimensionKey = keyof ReturnType<typeof useRoomStore.getState>['dimensions'];

export const ControlsPanel = () => {
  const dimensions = useRoomStore((state) => state.dimensions);
  const setDimensions = useRoomStore((state) => state.setDimensions);

  const metrics = useMemo(() => {
    return calculateRoomMetrics(dimensions);
  }, [dimensions]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = parseFloat(value) || 0;

    setDimensions({
      [name as DimensionKey]: numValue,
    });
  };

  return (
    <aside
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '320px',
        height: '100vh',
        backgroundColor: '#f8f9fa',
        padding: '20px',
        boxShadow: '-2px 0 5px rgba(0,0,0,0.1)',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        overflowY: 'auto',
      }}
    >
      <section style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <h2>Параметры комнаты</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <label htmlFor="length">Длина (м):</label>
            <input
              type="number"
              name="length"
              value={dimensions.length}
              onChange={handleChange}
              step="0.1"
              min="1"
              max="20"
              style={{ width: '60px' }}
            />
          </div>
          <input
            type="range"
            name="length"
            value={dimensions.length}
            onChange={handleChange}
            step="0.1"
            min="1"
            max="20"
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <label htmlFor="width">Ширина (м):</label>
            <input
              type="number"
              name="width"
              value={dimensions.width}
              onChange={handleChange}
              step="0.1"
              min="1"
              max="20"
              style={{ width: '60px' }}
            />
          </div>
          <input
            type="range"
            name="width"
            value={dimensions.width}
            onChange={handleChange}
            step="0.1"
            min="1"
            max="20"
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <label htmlFor="height">Высота (м):</label>
            <input
              type="number"
              name="height"
              value={dimensions.height}
              onChange={handleChange}
              step="0.1"
              min="2"
              max="5"
              style={{ width: '60px' }}
            />
          </div>
          <input
            type="range"
            name="height"
            value={dimensions.height}
            onChange={handleChange}
            step="0.1"
            min="2"
            max="5"
          />
        </div>
      </section>

      <hr style={{ width: '100%', borderColor: '#ddd' }} />

      <section style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <h2>Смета материалов</h2>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Площадь пола:</span>
          <strong>{metrics.floorArea} м²</strong>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Краска (в 2 слоя):</span>
          <strong>{metrics.paintLiters} л</strong>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Площадь стен:</span>
          <strong>{metrics.wallArea} м²</strong>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Длина плинтуса:</span>
          <strong>{metrics.skirtingLength} м</strong>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Ламинат (с запасом):</span>
          <strong>{metrics.totalPlanks} шт.</strong>
        </div>
      </section>
    </aside>
  );
};
