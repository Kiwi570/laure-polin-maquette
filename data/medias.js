/* Videos des oeuvres, presentees dans la fiche avec les photos de la MEME sculpture.
   Format attendu : MP4 (H.264 + AAC), 1080 px de cote au plus, quelques Mo ; une image d'attente
   facultative (« poster ») tiree de la video elle-meme, en WebP.
   Tant que le fichier n'est pas depose a l'adresse indiquee, la fiche affiche « Vidéo de l'œuvre à venir ».

   Fiche de demonstration : Prémices d'ouragan (2 photos dans la maquette, 1 video publiee sur le site actuel).
   Fichier attendu : assets/video/premices-d-ouragan/premices-d-ouragan-01.mp4
   Source : la video de la fiche https://www.sculptures-fr.com/page-d-articles/prémices-d-ouragan
   (a recuperer aupres de Laure Polin ou depuis son site : non telechargeable depuis l'environnement de travail). */
window.MEDIAS = {
  'premices-d-ouragan': {
    videos: [
      { src: 'video/premices-d-ouragan/premices-d-ouragan-01.mp4', a_recuperer: true, source: 'https://www.sculptures-fr.com/page-d-articles/prémices-d-ouragan' },
    ],
  },
};
