// Simplified Australia outline in normalised 0..1 space (x: west→east, y: north→south).
export const AUSTRALIA_OUTLINE: [number, number][] = [
  [0.693, 0.047], [0.761, 0.194], [0.932, 0.444], [0.945, 0.544],
  [0.891, 0.692], [0.861, 0.792], [0.782, 0.836], [0.673, 0.817],
  [0.636, 0.792], [0.523, 0.717], [0.432, 0.625], [0.227, 0.692],
  [0.134, 0.725], [0.068, 0.706], [0.084, 0.636], [0.034, 0.472],
  [0.045, 0.356], [0.15, 0.314], [0.232, 0.25], [0.295, 0.153],
  [0.427, 0.094], [0.557, 0.083], [0.568, 0.194], [0.659, 0.194],
];

/** Ray-casting point-in-polygon test. */
export function pointInPolygon(
  x: number,
  y: number,
  poly: [number, number][]
): boolean {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    const intersect =
      yi > y !== yj > y &&
      x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

/**
 * Rejection-sample `count` points uniformly inside the Australia polygon,
 * returning [x,y] in normalised 0..1 space. Deterministic-ish via Math.random
 * (called once at init).
 */
export function sampleInsideAustralia(count: number): [number, number][] {
  const pts: [number, number][] = [];
  let guard = 0;
  while (pts.length < count && guard < count * 40) {
    guard++;
    const x = Math.random();
    const y = 0.04 + Math.random() * 0.82;
    if (pointInPolygon(x, y, AUSTRALIA_OUTLINE)) pts.push([x, y]);
  }
  // Pad if sampling fell short.
  while (pts.length < count) pts.push(pts[pts.length % Math.max(1, pts.length)] ?? [0.5, 0.5]);
  return pts;
}
