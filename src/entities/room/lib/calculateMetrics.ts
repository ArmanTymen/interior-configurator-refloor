import { DEFAULT_PLANK } from '../model/constants';
import { RoomDimensions, CalculationResult, FloorLayout } from '../model/types';

const WASTE_COEFFICIENTS: Record<FloorLayout, number> = {
  straight: 1.07,
  herringbone: 1.15,
};
const PAINT_CONSUMPTION_TWO_LAYERS_PER_SQM = 0.2;

export const calculateRoomMetrics = (
  dimensions: RoomDimensions,
  layout: FloorLayout,
): CalculationResult => {
  const { length, width, height } = dimensions;

  const floorArea = length * width;
  const skirtingLength = 2 * (length + width);
  const wallArea = skirtingLength * height;

  const plankArea = DEFAULT_PLANK.width * DEFAULT_PLANK.length;
  const purePlanksCount = Math.ceil(floorArea / plankArea);
  const currentCoefficient = WASTE_COEFFICIENTS[layout];
  const totalPlanks = Math.ceil(purePlanksCount * currentCoefficient);

  const paintLiters = wallArea * PAINT_CONSUMPTION_TWO_LAYERS_PER_SQM;

  return {
    floorArea: Number(floorArea.toFixed(2)),
    skirtingLength: Number(skirtingLength.toFixed(2)),
    wallArea: Number(wallArea.toFixed(2)),
    totalPlanks,
    paintLiters: Number(paintLiters.toFixed(1)),
    purePlanksCount,
  };
};
