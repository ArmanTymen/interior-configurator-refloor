export interface PlankConfig {
  width: number;
  length: number;
  thickness: number;
}

export interface RoomConfig {
  width: number;
  depth: number;
}

export interface TransformData {
  id: string;
  position: [number, number, number];
  rotation: [number, number, number];
  size: [number, number, number];
}

const GAP = 0.002;
const FLOOR_OFFSET = 0.0001;

export const calculateHerringbone = (room: RoomConfig, plank: PlankConfig): TransformData[] => {
  const planks: TransformData[] = [];

  const cols = Math.ceil(room.width / plank.length);
  const rows = Math.ceil(room.depth / plank.width);

  const startX = -room.width / 2;
  const startZ = -room.depth / 2;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const currentX = startX + col * plank.length;
      const currentZ = startZ + row * plank.width;

      const actualLength = Math.min(plank.length, room.width / 2 - currentX);
      const actualWidth = Math.min(plank.width, room.depth / 2 - currentZ);

      if (actualLength <= 0 || actualWidth <= 0) continue;

      planks.push({
        id: `plank-${row}-${col}`,
        position: [
          currentX + actualLength / 2,
          plank.thickness / 2 + FLOOR_OFFSET,
          currentZ + actualWidth / 2,
        ],
        rotation: [0, 0, 0],
        size: [actualLength - GAP, plank.thickness, actualWidth - GAP],
      });
    }
  }

  return planks;
};
