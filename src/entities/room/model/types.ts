export interface PlankConfig {
  readonly width: number;
  readonly length: number;
  readonly thickness: number;
}
export interface RoomConfig {
  readonly width: number;
  readonly depth: number;
}

export interface TransformData {
  readonly id: string;
  readonly position: [number, number, number];
  readonly rotation: [number, number, number];
  readonly size: [number, number, number];
}

export interface RoomDimensions {
  readonly length: number;
  readonly width: number;
  readonly height: number;
}

export interface SkirtingConfig {
  readonly height: number;
  readonly thickness: number;
  readonly color: string;
}

export interface CalculationResult {
  readonly floorArea: number;
  readonly skirtingLength: number;
  readonly wallArea: number;
  readonly totalPlanks: number;
  readonly paintLiters: number;
}
