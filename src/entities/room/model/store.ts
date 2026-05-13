import { create } from 'zustand';

export interface RoomDimensions {
  length: number;
  width: number;
  height: number;
}

interface RoomState {
  dimensions: RoomDimensions;
  setDimensions: (newDimensions: Partial<RoomDimensions>) => void;
}

export const useRoomStore = create<RoomState>((set) => ({
  dimensions: {
    length: 5,
    width: 4,
    height: 2.8,
  },
  setDimensions: (newDimensions) =>
    set((state) => ({
      dimensions: { ...state.dimensions, ...newDimensions },
    })),
}));
