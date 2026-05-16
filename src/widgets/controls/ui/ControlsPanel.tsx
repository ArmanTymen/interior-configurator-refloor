import { useRoomStore } from '@/entities/room';
import { calculateHerringbone } from '@/entities/room/lib/calculateHerringbone';
import { calculateRoomMetrics } from '@/entities/room/lib/calculateMetrics';
import { DEFAULT_PLANK } from '@/entities/room/model/constants';
import { type ChangeEvent, useMemo } from 'react';

type DimensionKey = keyof ReturnType<typeof useRoomStore.getState>['dimensions'];

export const ControlsPanel = () => {
  const dimensions = useRoomStore((state) => state.dimensions);
  const setDimensions = useRoomStore((state) => state.setDimensions);

  const metrics = useMemo(() => {
    const generatedPlanks = calculateHerringbone(
      { width: dimensions.width, depth: dimensions.length },
      DEFAULT_PLANK,
    );

    return calculateRoomMetrics(dimensions, generatedPlanks.length);
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
      <section style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
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
