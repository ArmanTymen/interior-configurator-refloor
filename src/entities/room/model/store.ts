import { create } from 'zustand';
import { FloorLayout, RoomDimensions } from './types';

interface RoomState {
  dimensions: RoomDimensions;
  layout: FloorLayout;

  setDimensions: (newDimensions: Partial<RoomDimensions>) => void;
  setLayout: (layout: FloorLayout) => void;
}

export const useRoomStore = create<RoomState>((set) => ({
  dimensions: {
    length: 5,
    width: 4,
    height: 2.7,
  },

  layout: 'herringbone',

  setDimensions: (newDimensions) =>
    set((state) => ({
      dimensions: {
        ...state.dimensions,
        ...newDimensions,
      },
    })),

  setLayout: (layout) => set({ layout }),
}));
