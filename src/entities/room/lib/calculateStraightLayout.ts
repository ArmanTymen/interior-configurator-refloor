import { PlankConfig, RoomConfig, TransformData } from '../model/types';

const FLOOR_OFFSET = 0.0001;
const OVERLAP = 0.0003;

export const calculateStraightLayout = (room: RoomConfig, plank: PlankConfig): TransformData[] => {
  const planks: TransformData[] = [];

  const cols = Math.ceil(room.width / plank.width);
  const rows = Math.ceil(room.depth / plank.length) + 1;

  const startX = -room.width / 2;
  const startZ = -room.depth / 2;

  for (let col = 0; col < cols; col++) {
    const offsetZ = col % 2 !== 0 ? plank.length / 2 : 0;

    for (let row = 0; row < rows; row++) {
      const x = startX + col * plank.width + plank.width / 2;
      const z = startZ + row * plank.length + plank.length / 2 - offsetZ;

      planks.push({
        id: `${col}-${row}`,
        position: [x, plank.thickness / 2 + FLOOR_OFFSET, z],
        rotation: [0, 0, 0],
        size: [plank.width + OVERLAP, plank.thickness, plank.length + OVERLAP],
      });
    }
  }

  return planks;
};
