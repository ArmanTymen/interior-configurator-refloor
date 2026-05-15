export interface LightConfig {
  readonly ambientColor: string;
  readonly ambientIntensity: number;
  readonly directionalColor: string;
  readonly directionalIntensity: number;
  readonly directionalPosition: [number, number, number];
  readonly castShadow: boolean;
}
