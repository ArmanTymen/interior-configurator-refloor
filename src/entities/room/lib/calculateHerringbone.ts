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
}

const FLOOR_OFFSET = 0.0001;

export const calculateHerringbone = (room: RoomConfig, plank: PlankConfig): TransformData[] => {
  const planks: TransformData[] = [];
  const initialPlank: TransformData = {
    id: 'plank-origin-0',
    position: [0, plank.thickness / 2 + FLOOR_OFFSET, 0],
    rotation: [0, 0, 0],
  };

  planks.push(initialPlank);

  return planks;
};
