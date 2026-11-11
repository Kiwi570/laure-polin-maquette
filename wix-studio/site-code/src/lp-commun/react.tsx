/* Aides React communes aux composants Laure Polin. */
import React, { createContext, useContext, useEffect, useState } from 'react';
import type { FC, ReactNode } from 'react';
import { clipStrate } from './moteur';

/* Mode conception de l'éditeur Wix : fourni par component.preview.tsx (useIsEditMode),
   faux sur le site publié. En conception : pas d'ouverture, de Lenis, d'épinglage ni de lecture auto. */
export const EditionContext = createContext(false);
export const useEdition = (): boolean => useContext(EditionContext);

/** vrai une fois monté côté client (le premier rendu reste identique au rendu serveur) */
export function useMonte(): boolean {
  const [monte, setMonte] = useState(false);
  useEffect(() => { setMonte(true); }, []);
  return monte;
}

/** Les strates du « clivage » (LP.cliver) : n copies du titre, chacune découpée en bande, et la fente cuivrée. */
export const Strates: FC<{ n: number; s: Record<string, string>; children: ReactNode }> = ({ n, s, children }) => (
  <>
    {Array.from({ length: n }, (_, i) => (
      <span key={i} className={s.strate} data-strate="" aria-hidden={i > 0 ? 'true' : undefined} style={{ clipPath: clipStrate(i, n) }}>
        {children}
      </span>
    ))}
    <span className={s.fente} data-fente="" aria-hidden="true" />
  </>
);

/** remplace « {titre} » (etc.) dans un texte réglable */
export const gabarit = (t: string | undefined, v: Record<string, string>): string =>
  (t || '').replace(/\{(\w+)\}/g, (_, k: string) => (k in v ? v[k] : `{${k}}`));

/** « 21 œuvres » / « 1 œuvre » */
export const nombreOeuvres = (n: number, un = 'œuvre', plusieurs = 'œuvres'): string => `${n} ${n > 1 ? plusieurs : un}`;

/** classes de module à partir des noms de la maquette : cx(s, 'bouton bouton--plein') */
export const cx = (s: Record<string, string>, ...noms: Array<string | false | null | undefined>): string =>
  noms.filter(Boolean).join(' ').split(/\s+/).filter(Boolean).map((n) => s[n] || '').filter(Boolean).join(' ');

/** lien « tel: » à partir du numéro affiché (« 06 77 80 59 60 » ou « +33 6 77 80 59 60 ») */
export const telDe = (numero?: string): string => {
  const n = (numero || '').replace(/[^\d+]/g, '');
  return `tel:${n.startsWith('0') ? `+33${n.slice(1)}` : n}`;
};
