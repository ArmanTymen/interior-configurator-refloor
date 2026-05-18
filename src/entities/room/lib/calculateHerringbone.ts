import { PlankConfig, RoomConfig, TransformData } from '../model/types';

const OVERLAP = 0.0003;
const FLOOR_OFFSET = 0.0001;

export const calculateHerringbone = (room: RoomConfig, plank: PlankConfig): TransformData[] => {
  const planks: TransformData[] = [];
  const angle = Math.PI / 4;

  const stepX = plank.length * Math.SQRT2;
  const stepZ = plank.width * Math.SQRT2;

  const halfRoomW = room.width / 2;
  const halfRoomD = room.depth / 2;

  const startI = Math.floor(-halfRoomW / stepX) - 1;
  const endI = Math.ceil(halfRoomW / stepX) + 1;
  const startJ = Math.floor(-halfRoomD / stepZ) - 1;
  const endJ = Math.ceil(halfRoomD / stepZ) + 1;

  const radius = Math.sqrt(Math.pow(plank.length / 2, 2) + Math.pow(plank.width / 2, 2));

  for (let i = startI; i <= endI; i++) {
    for (let j = startJ; j <= endJ; j++) {
      const baseX = i * stepX;
      const baseZ = j * stepZ;

      addPlank(planks, plank, room, radius, baseX, baseZ, -angle, `a-${i}-${j}`);
      addPlank(
        planks,
        plank,
        room,
        radius,
        baseX + stepX / 2,
        baseZ + stepZ / 2,
        angle,
        `b-${i}-${j}`,
      );
    }
  }
  return planks;
};

function addPlank(
  planks: TransformData[],
  plank: PlankConfig,
  room: RoomConfig,
  radius: number,
  cx: number,
  cz: number,
  angle: number,
  id: string,
): void {
  if (
    cx > room.width / 2 + radius ||
    cx < -room.width / 2 - radius ||
    cz > room.depth / 2 + radius ||
    cz < -room.depth / 2 - radius
  ) {
    return;
  }
  planks.push({
    id,
    position: [cx, plank.thickness / 2 + FLOOR_OFFSET, cz],
    rotation: [0, angle, 0],
    size: [plank.length + OVERLAP, plank.thickness, plank.width + OVERLAP],
  });
}
