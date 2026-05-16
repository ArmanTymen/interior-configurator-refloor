import { RoomDimensions, CalculationResult } from '../model/types';

const WASTE_COEFFICIENT = 1.15;

/**
 * Рассчитывает основные метрики комнаты на основе размеров и фактического количества плашек.
 * @param dimensions - Объект с размерами комнаты (readonly)
 * @param actualPlankCount - Количество плашек, полученное из генератора пола
 */

export const calculateRoomMetrics = (
  dimensions: RoomDimensions,
  actualPlankCount: number,
): CalculationResult => {
  const { length, width, height } = dimensions;

  const floorArea = length * width;

  const skirtingLength = 2 * (length + width);

  const wallArea = skirtingLength * height;

  const totalPlanks = Math.ceil(actualPlankCount * WASTE_COEFFICIENT);

  return {
    floorArea: Number(floorArea.toFixed(2)),
    skirtingLength: Number(skirtingLength.toFixed(2)),
    wallArea: Number(wallArea.toFixed(2)),
    totalPlanks,
  };
};
