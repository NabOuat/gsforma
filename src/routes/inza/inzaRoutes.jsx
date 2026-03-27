/**
 * inzaRoutes.jsx
 * ─────────────────────────────────────────────────────────────
 * Sous-fichier de routes géré par INZA.
 * Chaque module possède sa propre entrée ici.
 * Importer ce tableau dans AppRoutes.jsx pour les enregistrer.
 * ─────────────────────────────────────────────────────────────
 */

import React, { lazy } from 'react';

// Lazy loading pour chaque module
const Accueil        = lazy(() => import('../../pages/Accueil'));
const Formation      = lazy(() => import('../../pages/Formation'));
const Sensibilisation = lazy(() => import('../../pages/Sensibilisation'));
const Edition        = lazy(() => import('../../pages/Edition'));
const Parametres     = lazy(() => import('../../pages/Parametres'));
const MiseAJour      = lazy(() => import('../../pages/MiseAJour'));
const Maintenance    = lazy(() => import('../../pages/Maintenance'));

/**
 * Structure d'une route :
 * {
 *   path     : string         — chemin URL
 *   element  : JSX.Element    — composant à rendre
 *   label    : string         — libellé lisible (pour breadcrumbs, etc.)
 *   exact?   : boolean        — correspondance exacte (optionnel)
 * }
 */
const inzaRoutes = [
  {
    path: '/',
    element: <Accueil />,
    label: 'Accueil',
    exact: true,
  },
  {
    path: '/formation',
    element: <Formation />,
    label: 'Formation',
  },
  {
    path: '/sensibilisation',
    element: <Sensibilisation />,
    label: 'Sensibilisation',
  },
  {
    path: '/edition',
    element: <Edition />,
    label: 'Édition',
  },
  {
    path: '/parametres',
    element: <Parametres />,
    label: 'Paramètres',
  },
  {
    path: '/mise-a-jour',
    element: <MiseAJour />,
    label: 'Mise à jour',
  },
  {
    path: '/maintenance',
    element: <Maintenance />,
    label: 'Maintenance',
  },
];

export default inzaRoutes;
