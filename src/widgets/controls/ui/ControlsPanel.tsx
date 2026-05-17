import { useRoomStore } from '@/entities/room';
import { calculateRoomMetrics } from '@/entities/room/lib/calculateMetrics';
import { useMemo, useCallback } from 'react';
import { DimensionRow } from '../../../shared/ui/DimensionRow/DimensionRow';

type DimensionKey = keyof ReturnType<typeof useRoomStore.getState>['dimensions'];

export const ControlsPanel = () => {
  const dimensions = useRoomStore((state) => state.dimensions);
  const setDimensions = useRoomStore((state) => state.setDimensions);

  const metrics = useMemo(() => calculateRoomMetrics(dimensions), [dimensions]);

  const handleDimensionChange = useCallback(
    (name: string, value: number) => {
      setDimensions({ [name as DimensionKey]: value });
    },
    [setDimensions],
  );

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

        <DimensionRow
          label="Длина"
          name="length"
          value={dimensions.length}
          min={1}
          max={20}
          step={0.1}
          onChange={handleDimensionChange}
        />
        <DimensionRow
          label="Ширина"
          name="width"
          value={dimensions.width}
          min={1}
          max={20}
          step={0.1}
          onChange={handleDimensionChange}
        />
        <DimensionRow
          label="Высота"
          name="height"
          value={dimensions.height}
          min={2}
          max={5}
          step={0.1}
          onChange={handleDimensionChange}
        />
      </section>

      <hr style={{ width: '100%', borderColor: '#242323' }} />

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
          <span>Ламинат (без запаса):</span>
          <strong>{metrics.purePlanksCount} шт.</strong>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Ламинат (с запасом):</span>
          <strong>{metrics.totalPlanks} шт.</strong>
        </div>
      </section>
    </aside>
  );
};
