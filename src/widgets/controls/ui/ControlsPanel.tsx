import { useRoomStore } from '@/entities/room';
import { calculateRoomMetrics } from '@/entities/room/lib/calculateMetrics';
import { useMemo, useCallback } from 'react';
import { DimensionRow } from '@/shared';
import styles from './ControlsPanel.module.css';

type DimensionKey = keyof ReturnType<typeof useRoomStore.getState>['dimensions'];

export const ControlsPanel = () => {
  const dimensions = useRoomStore((state) => state.dimensions);
  const setDimensions = useRoomStore((state) => state.setDimensions);
  const layout = useRoomStore((s) => s.layout);
  const setLayout = useRoomStore((s) => s.setLayout);

  const metrics = useMemo(() => calculateRoomMetrics(dimensions, layout), [dimensions, layout]);

  const handleDimensionChange = useCallback(
    (name: string, value: number) => {
      setDimensions({ [name as DimensionKey]: value });
    },
    [setDimensions],
  );

  return (
    <aside className={styles.panel}>
      <section className={styles.section}>
        <h2>Параметры комнаты</h2>
        <div className={styles.selectWrapper}>
          <label>Тип раскладки:</label>

          <select
            value={layout}
            onChange={(e) => setLayout(e.target.value as 'herringbone' | 'straight')}
            className={styles.select}
          >
            <option value="herringbone">Ёлочка</option>

            <option value="straight">Палубная</option>
          </select>
        </div>

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

      <hr className={styles.divider} />

      <section className={styles.estimates}>
        <h2>Смета материалов</h2>
        <div className={styles.estimateRow}>
          <span>Площадь пола:</span>
          <strong>{metrics.floorArea} м²</strong>
        </div>
        <div className={styles.estimateRow}>
          <span>Краска (в 2 слоя):</span>
          <strong>{metrics.paintLiters} л</strong>
        </div>
        <div className={styles.estimateRow}>
          <span>Площадь стен:</span>
          <strong>{metrics.wallArea} м²</strong>
        </div>
        <div className={styles.estimateRow}>
          <span>Длина плинтуса:</span>
          <strong>{metrics.skirtingLength} м</strong>
        </div>
        <div className={styles.estimateRow}>
          <span>Ламинат (без запаса):</span>
          <strong>{metrics.purePlanksCount} шт.</strong>
        </div>
        <div className={styles.estimateRow}>
          <span>Ламинат (с запасом):</span>
          <strong>{metrics.totalPlanks} шт.</strong>
        </div>
      </section>
    </aside>
  );
};
