const number = new Intl.NumberFormat('fr-FR')
const mad = (amount: number) => `${number.format(amount)} MAD`
const spas = (count: number) => `${count} ${count === 1 ? 'spa' : 'spas'}`

/**
 * Every word the site shows, in French: the language the site opens in.
 * `en.ts` has the same keys. In a title, *stars* mark the words set in colour
 * and a line break in the text is a line break on the page.
 */
export const fr = {
  code: 'fr',
  locale: 'fr_FR',

  site: {
    tagline: 'Le guide indépendant des spas du Maroc',
    description:
      'Trouvez, comparez et choisissez en confiance les meilleurs spas et hammams du Maroc. Sélectionnés par la rédaction, notés par les clients, jamais payés. Contactez chaque spa directement par WhatsApp ou par téléphone.',
    loading: 'Chargement',
    skip: 'Aller au contenu',
    close: 'Fermer',
  },

  format: {
    mad,
    // from: (amount: number) => `à partir de ${mad(amount)}`,
    spas,
    reviews: (count: number) => `${count} avis`,
    score: (value: number) => value.toFixed(1).replace('.', ','),
    quote: (text: string) => `« ${text} »`,
  },

  nav: {
    main: 'Navigation principale',
    discover: 'Découvrir',
    cities: 'Villes',
    experiences: 'Expériences',
    forSpas: 'Pour les spas',
    search: 'Rechercher',
    menu: 'Menu',
    language: 'Langue',
  },

  hero: {
    eyebrow: 'Le guide des spas au Maroc',
    title: 'Trouvez votre spa *idéal* au Maroc',
    imageAlt: 'Un hammam de marbre éclairé à la bougie, des pétales de rose sur les banquettes',
    promises: ['Sélectionnés par la rédaction', 'Notés par les clients', 'Jamais payés'],
    picks: 'Les choix du mois',
    allSpas: 'Tous les spas',
  },

  search: {
    label: 'Trouver un spa',
    submit: 'Rechercher',
    submitSpas: 'Rechercher des spas',
    count: (count: number) => `${spas(count)} au choix`,
    none: 'Aucun résultat exact pour l’instant : nous vous montrerons les plus proches',
    fields: {
      city: { label: 'Ville', any: 'Partout' },
      experience: { label: 'Expérience', any: 'Toutes' },
      budget: { label: 'Budget', any: 'Tous' },
      occasion: { label: 'Occasion', any: 'Toutes' },
    },
  },

  picks: {
    month: 'Octobre',
    title: 'Les choix *du mois*',
    lede: 'Les adresses que notre rédaction réserverait en ce moment. Elles changent chaque mois et ne sont jamais vendues.',
    seal: 'Choix d’octobre',
    view: 'Voir le spa',
    why: {
      'jardin-argile':
        'La chaleur est retombée. Le jardin de palmiers est à son meilleur : assez chaud pour la piscine, assez frais pour l’argile à midi.',
      'asif-wellness':
        'La houle d’automne est arrivée à Taghazout, et avec elle les épaules endolories. La terrasse est encore calme.',
      'maison-oudaya':
        'Lumière claire sur le fleuve et pas de foule. Le meilleur mois de Rabat, et le plus facile pour obtenir l’une des trois salles.',
      'villa-marshan':
        'Les foules de l’été ont retraversé le Détroit. Lumière blanche, air doux, et le jardin pour vous seul.',
    } as Record<string, string>,
    signature: {
      'jardin-argile': 'Enveloppement au rhassoul, au jardin',
      'asif-wellness': 'Récupération du surfeur',
      'maison-oudaya': 'Rituel de la Kasbah',
      'villa-marshan': 'Soin du Détroit',
    } as Record<string, string>,
  },

  cities: {
    eyebrow: 'Cinq villes',
    title: 'Découvrir par *ville*',
    lede: 'Chaque ville a sa façon de se baigner. Commencez par celle où vous allez.',
    all: 'Toutes les villes',
    byId: {
      marrakech: {
        name: 'Marrakech',
        alt: 'Une porte en cèdre peint sous un arc brisé, dans un mur rose de Marrakech',
      },
      casablanca: {
        name: 'Casablanca',
        alt: 'La mosquée Hassan II et son minaret au-dessus de l’Atlantique, à Casablanca',
      },
      agadir: {
        name: 'Agadir',
        alt: 'Des barques de pêche bleues sur la plage, sous les maisons blanches de Taghazout, près d’Agadir',
      },
      rabat: {
        name: 'Rabat',
        alt: 'Des palmiers le long des remparts de la Kasbah des Oudayas, à Rabat',
      },
      tangier: {
        name: 'Tanger',
        alt: 'Les toits blancs de la Kasbah de Tanger au-dessus de la baie, vus d’une terrasse à la table en zellige',
      },
    },
  },

  experiences: {
    eyebrow: 'Six portes d’entrée',
    title: 'Explorer par *expérience*',
    lede: 'Partez de ce que vous voulez, avec vos propres mots.',
    all: 'Toutes les expériences',
    choose: 'Choisir une expérience',
    previous: 'Expérience précédente',
    next: 'Expérience suivante',
    byId: {
      hammam: {
        name: 'Hammam',
        words: 'Je veux un vrai hammam, avec un vrai gommage.',
        promise: 'Vapeur, savon noir et un vrai gommage.',
      },
      massage: {
        name: 'Massage',
        words: 'J’ai mal au dos après le voyage.',
        promise: 'Des mains qui savent ce qu’un long voyage fait à un dos.',
      },
      beauty: {
        name: 'Beauté',
        words: 'Un soin du visage avant le mariage.',
        promise: 'Soins du visage et finitions, faits avec soin.',
      },
      wellness: {
        name: 'Bien-être',
        words: 'Une journée entière pour déconnecter.',
        promise: 'Une journée entière où l’on ne vous demande rien.',
      },
      couples: {
        name: 'En duo',
        words: 'Quelque chose de spécial pour notre anniversaire.',
        promise: 'Côte à côte, sans les clichés.',
      },
      recovery: {
        name: 'Récupération',
        words: 'Après une randonnée dans l’Atlas.',
        promise: 'Pour les jambes qui ont connu l’Atlas ou l’Atlantique.',
      },
    },
  },

  closing: {
    eyebrow: 'Encore indécis',
    title: 'Pas encore sûr ? *Commencez par une ville.*',
    lede: 'Dites-nous où vous serez. Nous vous montrerons qui vaut le détour.',
    arcadeAlt: 'Des arcs outrepassés en enduit rose autour d’une fontaine de marbre',
  },

  forSpas: {
    eyebrow: 'Pour les propriétaires de spa',
    title: 'Vous dirigez un spa ? Soyez trouvé par ceux qui *en choisissent un*.',
    line: 'Visibilité, contenu et rapports de demande. La sélection reste éditoriale.',
    cta: 'Pour les spas',
    doorAlt: 'Un arc outrepassé en brique et sa lourde porte de bois, ouverte sur une ruelle ensoleillée',
  },

  footer: {
    label: 'Pied de page',
    gloss: 'L’une ne touche jamais à l’autre.',
    discover: 'Découvrir',
    cities: 'Villes',
    experiences: 'Expériences',
    about: 'À propos',
    contact: 'Contact',
    navigation: 'Navigation',
    allSpas: 'Tous les spas',
    picks: 'Les choix du mois',
    hammams: 'Hammams traditionnels',
    forSpas: 'Pour les spas',
    write: 'Écrire à la rédaction',
    report: 'Signaler une erreur',
    correction: 'Correction',
    demo: 'Édition de démonstration : les spas, notes et prix affichés sont illustratifs.',
  },

  menu: {
    allSpas: 'Tous les spas',
    byCity: 'Par ville',
    byExperience: 'Par expérience',
    motto: 'Sélectionnés par la rédaction. Notés par les clients. Jamais payés.',
  },

  overlay: {
    title: 'Recherche',
    label: 'Rechercher dans le guide',
    placeholder: 'Ville, quartier, rituel ou spa',
    suggestions: 'Suggestions',
    allSpas: 'Tous les spas',
    show: (count: number) => `Voir ${spas(count)}`,
    closest: 'Voir les résultats les plus proches',
    startCity: 'Commencez par une ville',
    orWant: 'Ou par ce que vous cherchez',
    groups: { Places: 'Lieux', Experiences: 'Expériences', Spas: 'Spas' },
    withFeature: (feature: string) => `Avec ${feature.toLowerCase()}`,
    rated: (value: string) => `Note ${value}+`,
  },

  rating: {
    fresh: 'Nouveau',
    labels: {
      Excellent: 'Excellent',
      'Very good': 'Très bien',
      Good: 'Bien',
      Fair: 'Correct',
      Poor: 'Décevant',
    },
    spoken: (average: string, count: number, label: string) => `Noté ${average} sur 5 par les clients, ${count} avis, ${label}`,
    spokenFresh: (count: number) => `Nouveau dans le guide, ${count} avis pour l’instant`,
  },

  comingSoon: {
    title: 'Bientôt',
    description: 'Cette partie du guide arrive bientôt.',
    eyebrow: 'En préparation',
    heading: 'Cette porte s’ouvre *bientôt*.',
    lede: 'Nous préparons encore cette partie du guide. La page d’accueil est prête à explorer.',
    back: 'Retour à l’accueil',
  },

  spaTypes: {
    'hotel-spa': { name: 'Spa d’hôtel', plural: 'Spas d’hôtel' },
    'day-spa': { name: 'Spa urbain', plural: 'Spas urbains' },
    'traditional-hammam': { name: 'Hammam traditionnel', plural: 'Hammams traditionnels' },
    'luxury-spa': { name: 'Spa de luxe', plural: 'Spas de luxe' },
    'wellness-centre': { name: 'Centre de bien-être', plural: 'Centres de bien-être' },
  },

  occasions: {
    solo: 'Un moment pour moi',
    couple: 'À deux',
    friends: 'Entre amis',
    celebration: 'Une célébration',
    'first-hammam': 'Mon premier hammam',
    'after-sport': 'Après le sport ou le voyage',
  },

  priceBands: {
    1: { name: 'Accessible', range: 'Moins de 400 MAD' },
    2: { name: 'Intermédiaire', range: '400 à 800 MAD' },
    3: { name: 'Premium', range: '800 à 1 500 MAD' },
    4: { name: 'Luxe', range: 'Plus de 1 500 MAD' },
  },

  facilities: {
    pool: 'Piscine',
    sauna: 'Sauna',
    jacuzzi: 'Jacuzzi',
    'private-hammam': 'Hammam privatif',
    'couples-room': 'Cabine duo',
    gym: 'Salle de sport',
    outdoor: 'Jardin ou terrasse',
    'hotel-access': 'Équipements de l’hôtel',
  },

  distinctions: {
    3: 'Exceptionnel',
    2: 'Vivement recommandé',
    1: 'Sélection Signature',
  },
}

export type Dictionary = typeof fr
