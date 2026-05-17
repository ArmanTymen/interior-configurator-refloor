import { create } from 'zustand';
import { RoomDimensions } from './types';

interface RoomState {
  dimensions: RoomDimensions;
  setDimensions: (newDimensions: Partial<RoomDimensions>) => void;
}

export const useRoomStore = create<RoomState>((set) => ({
  dimensions: {
    length: 5,
    width: 4,
    height: 2.7,
  },
  setDimensions: (newDimensions) =>
    set((state) => ({
      dimensions: { ...state.dimensions, ...newDimensions },
    })),
}));
