import type { A11y, Direction, Image, Link } from '@wix/editor-react-types';

/** Une œuvre en collection privée (pas en vente : ce n’est pas un produit Wix Stores). */
export type OeuvreCollection = {
  /** Titre de l’œuvre */
  titre?: string;
  /** Photo de l’œuvre */
  photo?: Image;
  /** Lien vers une page de l’œuvre (facultatif) */
  lien?: Link;
};

export type LpCollectionProps = {
  id: string;
  className?: string;
  direction?: Direction;
  a11y?: A11y;

  /** Titre de la section */
  titre?: string;
  /** Titre de la section (anglais) */
  titreEn?: string;
  /** Texte à côté du titre */
  texte?: string;
  /** Texte à côté du titre (anglais) */
  texteEn?: string;
  /** Les œuvres des deux bandeaux (la première moitié en haut, la seconde en bas) */
  oeuvres: Array<OeuvreCollection>;
  /** Mention sous le titre, au survol d’une vignette */
  legendeStatut?: string;
  /** Mention sous le titre, au survol d’une vignette (anglais) */
  legendeStatutEn?: string;
  /** Défilement automatique des bandeaux */
  autoPlay?: boolean;
  /** Bouton pause des bandeaux : toujours visible ou au survol */
  pauseButtonVisibility?: 'showAlways' | 'showOnHover';

  elementProps?: {
    lpCollectionTitre?: { className?: string };
    lpCollectionTexte?: { className?: string };
    lpCollectionVignette?: { className?: string };
    lpCollectionPause?: { className?: string };
  };
};

export const defaultProps = {
  titre: 'Collection privée',
  titreEn: 'Private collection',
  texte: 'Ces œuvres ont rejoint des collections privées. Elles restent à découvrir ici.',
  texteEn: 'These works have joined private collections. They remain on view here.',
  oeuvres: [
    { titre: 'Sous pression', photo: { url: 'https://static.wixstatic.com/media/2d5176_50bb728ac75d4a4295ddb02acb834a17~mv2.webp', uri: '2d5176_50bb728ac75d4a4295ddb02acb834a17~mv2.webp', alt: 'Sous pression, de Laure Polin' } },
    { titre: 'Énergies', photo: { url: 'https://static.wixstatic.com/media/2d5176_07df3c7fca564a6b8d02fab39060ead3~mv2.webp', uri: '2d5176_07df3c7fca564a6b8d02fab39060ead3~mv2.webp', alt: 'Énergies, sculpture en bronze, de Laure Polin' } },
    { titre: 'Homme 2', photo: { url: 'https://static.wixstatic.com/media/2d5176_a4cfb94756904174bd156220a80927a6~mv2.webp', uri: '2d5176_a4cfb94756904174bd156220a80927a6~mv2.webp', alt: 'Homme 2, sculpture en terre cuite, de Laure Polin' } },
    { titre: 'Oiseau feuille', photo: { url: 'https://static.wixstatic.com/media/2d5176_a1f9321b772c490eb5ccbe5a75339925~mv2.webp', uri: '2d5176_a1f9321b772c490eb5ccbe5a75339925~mv2.webp', alt: 'Oiseau feuille, sculpture en ardoise, de Laure Polin' } },
    { titre: 'Femme 11', photo: { url: 'https://static.wixstatic.com/media/2d5176_b641294bbd484f61b9d0a38079cde592~mv2.webp', uri: '2d5176_b641294bbd484f61b9d0a38079cde592~mv2.webp', alt: 'Femme 11, sculpture en terre cuite, de Laure Polin' } },
    { titre: 'Femme 14', photo: { url: 'https://static.wixstatic.com/media/2d5176_8db9d76c0e2b4847a295850348e2d025~mv2.webp', uri: '2d5176_8db9d76c0e2b4847a295850348e2d025~mv2.webp', alt: 'Femme 14, sculpture en terre cuite, de Laure Polin' } },
    { titre: 'Femme 1', photo: { url: 'https://static.wixstatic.com/media/2d5176_cbf638013d22448aa59f47bb99f5d8ff~mv2.webp', uri: '2d5176_cbf638013d22448aa59f47bb99f5d8ff~mv2.webp', alt: 'Femme 1, sculpture en terre cuite, de Laure Polin' } },
    { titre: 'Cheveux au vent', photo: { url: 'https://static.wixstatic.com/media/2d5176_ec6e8eb14fdb40999c6a1077f2d10cbd~mv2.webp', uri: '2d5176_ec6e8eb14fdb40999c6a1077f2d10cbd~mv2.webp', alt: 'Cheveux au vent, sculpture en ardoise, de Laure Polin' } },
    { titre: 'Fin hivernale', photo: { url: 'https://static.wixstatic.com/media/2d5176_cedc8d2a730a41689c22267268cf76e6~mv2.webp', uri: '2d5176_cedc8d2a730a41689c22267268cf76e6~mv2.webp', alt: 'Fin hivernale, de Laure Polin' } },
    { titre: 'Pierrot', photo: { url: 'https://static.wixstatic.com/media/2d5176_3a969878a54349f0b7663028f0ee6af5~mv2.webp', uri: '2d5176_3a969878a54349f0b7663028f0ee6af5~mv2.webp', alt: 'Pierrot, sculpture en ardoise, de Laure Polin' } },
    { titre: 'Le veilleur', photo: { url: 'https://static.wixstatic.com/media/2d5176_3b21baa5aaec42218c065bca5280486c~mv2.webp', uri: '2d5176_3b21baa5aaec42218c065bca5280486c~mv2.webp', alt: 'Le veilleur, sculpture en ardoise, de Laure Polin' } },
    { titre: 'Femme 15', photo: { url: 'https://static.wixstatic.com/media/2d5176_98130bc7a59b4aeba93bf4d5b99b9079~mv2.webp', uri: '2d5176_98130bc7a59b4aeba93bf4d5b99b9079~mv2.webp', alt: 'Femme 15, sculpture en terre cuite, de Laure Polin' } },
    { titre: 'You and me', photo: { url: 'https://static.wixstatic.com/media/2d5176_a66966b20c8a4c16b1ea87f0cf42f52b~mv2.webp', uri: '2d5176_a66966b20c8a4c16b1ea87f0cf42f52b~mv2.webp', alt: 'You and me, sculpture en ardoise, de Laure Polin' } },
    { titre: 'Je vous regarde', photo: { url: 'https://static.wixstatic.com/media/2d5176_fa6a4642ddef48938be55302b717c5f5~mv2.webp', uri: '2d5176_fa6a4642ddef48938be55302b717c5f5~mv2.webp', alt: 'Je vous regarde, sculpture en ardoise, de Laure Polin' } },
    { titre: 'Pleine lune', photo: { url: 'https://static.wixstatic.com/media/2d5176_6477108451b34200af9c9fa05d1db38d~mv2.webp', uri: '2d5176_6477108451b34200af9c9fa05d1db38d~mv2.webp', alt: 'Pleine lune, sculpture en ardoise, de Laure Polin' } },
    { titre: 'Femme 7', photo: { url: 'https://static.wixstatic.com/media/2d5176_10141d483fa347b19f866304806fade2~mv2.webp', uri: '2d5176_10141d483fa347b19f866304806fade2~mv2.webp', alt: 'Femme 7, sculpture en terre cuite, de Laure Polin' } },
    { titre: 'Retour aux sources 1', photo: { url: 'https://static.wixstatic.com/media/2d5176_b51090d839ed45b7a0d1cfdb427500dd~mv2.webp', uri: '2d5176_b51090d839ed45b7a0d1cfdb427500dd~mv2.webp', alt: 'Retour aux sources 1, sculpture en ardoise, de Laure Polin' } },
    { titre: 'Ange gardien', photo: { url: 'https://static.wixstatic.com/media/2d5176_9670665d3d0d4ae5aa7c8dd357074bb6~mv2.webp', uri: '2d5176_9670665d3d0d4ae5aa7c8dd357074bb6~mv2.webp', alt: 'Ange gardien, sculpture en ardoise, de Laure Polin' } },
    { titre: 'Femme 3', photo: { url: 'https://static.wixstatic.com/media/2d5176_8309bb650b5a4ac2b254d445a8ebe618~mv2.webp', uri: '2d5176_8309bb650b5a4ac2b254d445a8ebe618~mv2.webp', alt: 'Femme 3, sculpture en terre cuite, de Laure Polin' } },
    { titre: 'Femme 4', photo: { url: 'https://static.wixstatic.com/media/2d5176_19bb82b521d14f4585cb061b45465a4c~mv2.webp', uri: '2d5176_19bb82b521d14f4585cb061b45465a4c~mv2.webp', alt: 'Femme 4, sculpture en terre cuite, de Laure Polin' } },
    { titre: 'L\'âme des arbres', photo: { url: 'https://static.wixstatic.com/media/2d5176_325c1a19f6504818a57e5ba780e12d7a~mv2.webp', uri: '2d5176_325c1a19f6504818a57e5ba780e12d7a~mv2.webp', alt: 'L\'âme des arbres, sculpture en bronze, de Laure Polin' } },
    { titre: 'Désir d\'évasion', photo: { url: 'https://static.wixstatic.com/media/2d5176_aa23b42828354cd7b32d33cf37d048eb~mv2.webp', uri: '2d5176_aa23b42828354cd7b32d33cf37d048eb~mv2.webp', alt: 'Désir d\'évasion, sculpture en ardoise, de Laure Polin' } },
    { titre: 'Oiseau plonge', photo: { url: 'https://static.wixstatic.com/media/2d5176_d70828777be449719862dacc00314cf5~mv2.webp', uri: '2d5176_d70828777be449719862dacc00314cf5~mv2.webp', alt: 'Oiseau plonge, sculpture en ardoise, de Laure Polin' } },
    { titre: 'Mignonne', photo: { url: 'https://static.wixstatic.com/media/2d5176_e8397be1cabd46ac9bd5122451a39ca5~mv2.webp', uri: '2d5176_e8397be1cabd46ac9bd5122451a39ca5~mv2.webp', alt: 'Mignonne, sculpture en ardoise, de Laure Polin' } },
    { titre: 'Miroir, oh mon miroir…', photo: { url: 'https://static.wixstatic.com/media/2d5176_5f3f29cb28c14306830d5623dcdcca66~mv2.webp', uri: '2d5176_5f3f29cb28c14306830d5623dcdcca66~mv2.webp', alt: 'Miroir, oh mon miroir…, sculpture en ardoise, de Laure Polin' } },
    { titre: 'Coucher de soleil', photo: { url: 'https://static.wixstatic.com/media/2d5176_b846af9381344325a1f48ed374138a31~mv2.webp', uri: '2d5176_b846af9381344325a1f48ed374138a31~mv2.webp', alt: 'Coucher de soleil, sculpture en ardoise, de Laure Polin' } },
    { titre: 'Arum', photo: { url: 'https://static.wixstatic.com/media/2d5176_f4e232b7fc8b47898741c8f055466959~mv2.webp', uri: '2d5176_f4e232b7fc8b47898741c8f055466959~mv2.webp', alt: 'Arum, sculpture en bronze, de Laure Polin' } },
    { titre: 'La promeneuse', photo: { url: 'https://static.wixstatic.com/media/2d5176_9c45fbec8fbe442b8ea7f4d28311aa18~mv2.webp', uri: '2d5176_9c45fbec8fbe442b8ea7f4d28311aa18~mv2.webp', alt: 'La promeneuse, sculpture en ardoise, de Laure Polin' } },
    { titre: 'Au loin', photo: { url: 'https://static.wixstatic.com/media/2d5176_09d6c8bda2654e59aba63ece6fa057ac~mv2.webp', uri: '2d5176_09d6c8bda2654e59aba63ece6fa057ac~mv2.webp', alt: 'Au loin, sculpture en ardoise, de Laure Polin' } },
    { titre: 'Transmettre au monde', photo: { url: 'https://static.wixstatic.com/media/2d5176_de9e9ff41d124e19938f89a197be3cfe~mv2.webp', uri: '2d5176_de9e9ff41d124e19938f89a197be3cfe~mv2.webp', alt: 'Transmettre au monde, sculpture en ardoise, de Laure Polin' } },
    { titre: 'Madame Bâ', photo: { url: 'https://static.wixstatic.com/media/2d5176_755f314ffdfc4e8798c1e72db12a95f2~mv2.webp', uri: '2d5176_755f314ffdfc4e8798c1e72db12a95f2~mv2.webp', alt: 'Madame Bâ, sculpture en ardoise, de Laure Polin' } },
    { titre: 'L\'ancien', photo: { url: 'https://static.wixstatic.com/media/2d5176_c2256fd4a8854a409ed896263f9fbb8d~mv2.webp', uri: '2d5176_c2256fd4a8854a409ed896263f9fbb8d~mv2.webp', alt: 'L\'ancien, de Laure Polin' } },
    { titre: 'La grande dame', photo: { url: 'https://static.wixstatic.com/media/2d5176_1af7300b7efb4f5eb70956a09b629c64~mv2.webp', uri: '2d5176_1af7300b7efb4f5eb70956a09b629c64~mv2.webp', alt: 'La grande dame, sculpture en ardoise, de Laure Polin' } },
    { titre: 'Le phoenyx', photo: { url: 'https://static.wixstatic.com/media/2d5176_215ecccf99a441369d1585502bfea9f3~mv2.webp', uri: '2d5176_215ecccf99a441369d1585502bfea9f3~mv2.webp', alt: 'Le phoenyx, sculpture en ardoise, de Laure Polin' } },
    { titre: 'Le cyclope', photo: { url: 'https://static.wixstatic.com/media/2d5176_fa8df47443714dfdaff3f45ff2605ef5~mv2.webp', uri: '2d5176_fa8df47443714dfdaff3f45ff2605ef5~mv2.webp', alt: 'Le cyclope, sculpture en bronze, ardoise, de Laure Polin' } },
    { titre: 'Évanescence', photo: { url: 'https://static.wixstatic.com/media/2d5176_99946f70186c4128b689deb67c28d53e~mv2.webp', uri: '2d5176_99946f70186c4128b689deb67c28d53e~mv2.webp', alt: 'Évanescence, sculpture en bronze, ardoise, de Laure Polin' } },
    { titre: 'Pensif', photo: { url: 'https://static.wixstatic.com/media/2d5176_ba9cb8b97d7143debcb6bb14dfd6155a~mv2.webp', uri: '2d5176_ba9cb8b97d7143debcb6bb14dfd6155a~mv2.webp', alt: 'Pensif, sculpture en ardoise, de Laure Polin' } },
    { titre: 'Le gardien', photo: { url: 'https://static.wixstatic.com/media/2d5176_c55fdd0c59e14967887ee7d312bc0745~mv2.webp', uri: '2d5176_c55fdd0c59e14967887ee7d312bc0745~mv2.webp', alt: 'Le gardien, sculpture en bronze, ardoise, de Laure Polin' } },
    { titre: 'Inspiration', photo: { url: 'https://static.wixstatic.com/media/2d5176_ba7e45fcab124c7bb162adccfbdf4e75~mv2.webp', uri: '2d5176_ba7e45fcab124c7bb162adccfbdf4e75~mv2.webp', alt: 'Inspiration, sculpture en ardoise, de Laure Polin' } },
    { titre: 'Nale', photo: { url: 'https://static.wixstatic.com/media/2d5176_d1380d0e563a4b43a505c8ec0a8bb7ac~mv2.webp', uri: '2d5176_d1380d0e563a4b43a505c8ec0a8bb7ac~mv2.webp', alt: 'Nale, sculpture en ardoise, de Laure Polin' } },
    { titre: 'Végétal', photo: { url: 'https://static.wixstatic.com/media/2d5176_3b8146180e084401bcad14b3570b05c2~mv2.webp', uri: '2d5176_3b8146180e084401bcad14b3570b05c2~mv2.webp', alt: 'Végétal, sculpture en ardoise, de Laure Polin' } },
    { titre: 'Racines', photo: { url: 'https://static.wixstatic.com/media/2d5176_13fac5dece2a460e83b9ddc1e1916840~mv2.webp', uri: '2d5176_13fac5dece2a460e83b9ddc1e1916840~mv2.webp', alt: 'Racines, sculpture en bronze, de Laure Polin' } },
    { titre: 'Parure de fête', photo: { url: 'https://static.wixstatic.com/media/2d5176_f84e267a8a874380af3ce0cf8585929c~mv2.webp', uri: '2d5176_f84e267a8a874380af3ce0cf8585929c~mv2.webp', alt: 'Parure de fête, sculpture en ardoise, de Laure Polin' } },
    { titre: 'Sablier infini', photo: { url: 'https://static.wixstatic.com/media/2d5176_86f91e9318cb470a901646738112f2aa~mv2.webp', uri: '2d5176_86f91e9318cb470a901646738112f2aa~mv2.webp', alt: 'Sablier infini, sculpture en ardoise, de Laure Polin' } },
    { titre: 'Retour aux sources 2', photo: { url: 'https://static.wixstatic.com/media/2d5176_46d4f52848954bcfacc788fe9e8a984c~mv2.webp', uri: '2d5176_46d4f52848954bcfacc788fe9e8a984c~mv2.webp', alt: 'Retour aux sources 2, sculpture en ardoise, de Laure Polin' } },
    { titre: 'La mémoire', photo: { url: 'https://static.wixstatic.com/media/2d5176_4a226fd946c7471fb3ae398ac6ff3d84~mv2.webp', uri: '2d5176_4a226fd946c7471fb3ae398ac6ff3d84~mv2.webp', alt: 'La mémoire, sculpture en bronze, ardoise, de Laure Polin' } },
    { titre: 'Poisson abyssal', photo: { url: 'https://static.wixstatic.com/media/2d5176_d32aca305720404ea21c6f1901e9a579~mv2.webp', uri: '2d5176_d32aca305720404ea21c6f1901e9a579~mv2.webp', alt: 'Poisson abyssal, sculpture en ardoise, de Laure Polin' } },
    { titre: 'Désir', photo: { url: 'https://static.wixstatic.com/media/2d5176_8b4a16c6728b4d64add1eede761e2f2b~mv2.webp', uri: '2d5176_8b4a16c6728b4d64add1eede761e2f2b~mv2.webp', alt: 'Désir, sculpture en ardoise, de Laure Polin' } },
    { titre: 'Sans titre', photo: { url: 'https://static.wixstatic.com/media/2d5176_0125aeb9dd4248fc872b97130a615ef9~mv2.webp', uri: '2d5176_0125aeb9dd4248fc872b97130a615ef9~mv2.webp', alt: 'Sans titre, de Laure Polin' } },
    { titre: 'Le sage', photo: { url: 'https://static.wixstatic.com/media/2d5176_0d8641fc232546debcd30311a8dfa6d1~mv2.webp', uri: '2d5176_0d8641fc232546debcd30311a8dfa6d1~mv2.webp', alt: 'Le sage, sculpture en ardoise, de Laure Polin' } },
    { titre: 'La bûche de Noël', photo: { url: 'https://static.wixstatic.com/media/2d5176_c7788c3a28604ab09dcc5ffd801ed3de~mv2.webp', uri: '2d5176_c7788c3a28604ab09dcc5ffd801ed3de~mv2.webp', alt: 'La bûche de Noël, sculpture en bronze, de Laure Polin' } },
    { titre: 'Point de rencontre', photo: { url: 'https://static.wixstatic.com/media/2d5176_a9abf840caa545b491576fd0671ff0e5~mv2.webp', uri: '2d5176_a9abf840caa545b491576fd0671ff0e5~mv2.webp', alt: 'Point de rencontre, de Laure Polin' } },
    { titre: 'Tranquille', photo: { url: 'https://static.wixstatic.com/media/2d5176_a950e71ad0504c25b72dff9189929496~mv2.webp', uri: '2d5176_a950e71ad0504c25b72dff9189929496~mv2.webp', alt: 'Tranquille, de Laure Polin' } },
    { titre: 'Caravelle', photo: { url: 'https://static.wixstatic.com/media/2d5176_3b8485f64e1f4cb980ad52956e6a7e6a~mv2.webp', uri: '2d5176_3b8485f64e1f4cb980ad52956e6a7e6a~mv2.webp', alt: 'Caravelle, de Laure Polin' } },
    { titre: 'Azur', photo: { url: 'https://static.wixstatic.com/media/2d5176_45f7853c0d6b4e798c96ba91b14cfccb~mv2.webp', uri: '2d5176_45f7853c0d6b4e798c96ba91b14cfccb~mv2.webp', alt: 'Azur, de Laure Polin' } },
    { titre: 'Retour des Antilles', photo: { url: 'https://static.wixstatic.com/media/2d5176_8539c24a13284626b56c47197c40c01a~mv2.webp', uri: '2d5176_8539c24a13284626b56c47197c40c01a~mv2.webp', alt: 'Retour des Antilles, de Laure Polin' } },
    { titre: 'La femme d\'Essaouira', photo: { url: 'https://static.wixstatic.com/media/2d5176_0c8f9d0d98844241af8ee084936421c0~mv2.webp', uri: '2d5176_0c8f9d0d98844241af8ee084936421c0~mv2.webp', alt: 'La femme d\'Essaouira, de Laure Polin' } },
    { titre: 'Le trésor du sculpteur', photo: { url: 'https://static.wixstatic.com/media/2d5176_1bf1321f11bb4ef0aa8231b629d4670f~mv2.webp', uri: '2d5176_1bf1321f11bb4ef0aa8231b629d4670f~mv2.webp', alt: 'Le trésor du sculpteur, de Laure Polin' } },
    { titre: 'Monseigneur', photo: { url: 'https://static.wixstatic.com/media/2d5176_1158c8e8c7c74d35acf54018812510b4~mv2.webp', uri: '2d5176_1158c8e8c7c74d35acf54018812510b4~mv2.webp', alt: 'Monseigneur, de Laure Polin' } },
    { titre: 'Poisson vole', photo: { url: 'https://static.wixstatic.com/media/2d5176_f770037bd20e416387dc246efaa8b6a3~mv2.webp', uri: '2d5176_f770037bd20e416387dc246efaa8b6a3~mv2.webp', alt: 'Poisson vole, de Laure Polin' } },
  ],
  legendeStatut: 'En collection privée',
  legendeStatutEn: 'In a private collection',
  autoPlay: true,
  pauseButtonVisibility: 'showOnHover',
  a11y: {},
} as const satisfies Omit<LpCollectionProps, 'id' | 'className'>;
