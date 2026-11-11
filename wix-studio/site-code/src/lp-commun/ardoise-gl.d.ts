export type FondArdoise = {
  canvas: HTMLCanvasElement;
  teinter: (couleurHex: string, force?: number) => void;
  detruire: () => void;
};
export function fondArdoise(
  conteneur: HTMLElement,
  options?: { image?: string; imageMobile?: string; teinte?: number; couleur?: Array<number>; intensiteRevele?: number },
): FondArdoise | null;
