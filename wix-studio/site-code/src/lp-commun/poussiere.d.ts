export function poussiere(
  img: HTMLImageElement,
  scene: HTMLElement,
  o?: { duree?: number; sens?: 'assemble' | 'disperse'; nombre?: number; depuis?: 'gauche' | 'droite' | 'bas' },
): Promise<void>;
