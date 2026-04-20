export type PhotoEntry = {
  file: string;
  location?: string;
  date?: string;
  caption?: string;
  highlight?: {
    friendName: string;
    story: string;
    quote?: string;
  };
  text?: string;
  textAttribution?: string;
};

// Location ranges — a photo's location is determined by the highest
// range start that doesn't exceed its number.
const locationRanges: [number, string][] = [
  [0, 'The beginning'],
  [11, 'West Maple Way'],
  [69, 'Nuremberg'],
  [73, 'West Maple Way'],
  [79, 'Buenos Aires'],
  [109, 'West Maple Way'],
  [145, 'Le College Road Trip'],
  [149, 'Calafell'],
  [181, 'Barcelona'],
  [195, 'New York'],
  [199, 'Woodside'],
  [229, 'Singapore'],
  [259, 'Woodside'],
  [279, 'New York'],
  [286, 'Pe Erre'],
  [289, 'Dubai'],
  [350, 'San Francisco'],
];

function getLocation(n: number): string {
  let loc = '';
  for (const [start, name] of locationRanges) {
    if (n >= start) loc = name;
  }
  return loc;
}

// Get file extension for a given number
function findFile(n: number): string {
  const extensions = ['jpg', 'jpeg', 'png'];
  // We'll just try jpg first, fall back to jpeg
  const jpegNumbers = [62, 95, 115, 186, 187];
  const ext = jpegNumbers.includes(n) ? 'jpeg' : 'jpg';
  return `${n}.${ext}`;
}

// All photos — sorted by key. Add new ones anywhere.
const photoNumbers = [
  10, 20, 30, 40, 45, 50, 55, 60, 62, 65, 70, 75, 76, 80,
  90, 95, 97, 100, 110, 111, 115, 120, 130, 140, 146, 147, 150, 155, 160, 163, 170,
  180, 184, 185, 186, 187, 190, 196, 200, 210, 220, 230, 240,
  250, 255, 260, 270, 275, 280, 285, 287, 288, 289, 290, 295, 300, 310, 312, 320, 325, 330, 355,
];

export const photos: Record<number, PhotoEntry> = {};

for (const n of photoNumbers) {
  photos[n] = {
    file: findFile(n),
    location: getLocation(n),
  };
}

// --- Memories & Quotes ---

photos[10] = {
  ...photos[10],
  text: 'I still remember the diner next to Lipton when we both sat down. I was so nervous, in my mind this was make or break for being able to actually do something. I remember immediately being so relieved when you went yeah let\'s do it, and genuinely I felt touched that you would put so much confidence in me. Almost everything that has happened to me over the last two years can basically trace back to you taking a chance on me. Gracias.',
  textAttribution: 'Dio',
};

// Gonza's basketball memory — early in the timeline
photos[40] = {
  ...photos[40],
  text: 'At the start of the company we played 1v1 basketball everyday. Great times.',
  textAttribution: 'Gonza',
};

// Scattered Dro quotes — no attribution, just dropped in
photos[120] = {
  ...photos[120],
  text: '"I can beat anyone in a fight."',
};

photos[250] = {
  ...photos[250],
  text: '"5k if you win a fight against me."',
};

photos[200] = {
  ...photos[200],
  text: 'The Dro Method of Argumentation: you think pizza is good? Well what if someone force-fed you 47 pizzas while you were hanging off a cliff — would you still say pizza is good then?',
};

photos[55] = {
  ...photos[55],
  text: '"Enrique\'s doing little push ups while we work"',
};

photos[60] = {
  ...photos[60],
  text: '"I love you Alex"',
};

photos[65] = {
  ...photos[65],
  text: 'Brainstorming the paradigm questions and debating them for hours while training isgay on the couch in the old house. That was the real work.',
};

photos[95] = {
  ...photos[95],
  text: '"Alien exploration"',
};

photos[140] = {
  ...photos[140],
  text: '"All we need to do to capture Maduro is to use decentralized incentives"',
};

photos[210] = {
  ...photos[210],
  text: '"What are tahxes"',
};

photos[230] = {
  ...photos[230],
  text: '"A country that doesn\'t have Zyn\'s is a completely shit country"',
};

photos[50] = {
  ...photos[50],
  text: '4Loko + sushi + FIFA',
};

photos[295] = {
  ...photos[295],
  text: '"Houthi... boom"',
};

photos[310] = {
  ...photos[310],
  text: '"I\'m just a guy making some calls"',
};

photos[355] = {
  ...photos[355],
  text: '"I find it so impressive that you drove all the way from the Strait of Hormuz to California with no navigation, while applying multiple layers of moisturizer and sunscreen and at the same time teaching a group of orphans how to change a tire"',
};

photos[76] = {
  ...photos[76],
  text: '"Diablo"',
};

photos[220] = {
  ...photos[220],
  text: '"Do you like to make more money or less money?"',
};

photos[160] = {
  ...photos[160],
  text: '"Mis respetos"',
};

photos[260] = {
  ...photos[260],
  text: '"Hay sexo?"',
};

photos[288] = {
  ...photos[288],
  text: '"If she fits on a scooter with me, she\'s too skinny"',
};

photos[147] = {
  ...photos[147],
  text: '"Ema, don\'t worry I\'ll drive safe" (proceeds to drive with his head out the window for 3 hours)',
};

// --- Highlights ---

// Dio — #115, West Maple Way
photos[115] = {
  ...photos[115],
  highlight: {
    friendName: 'Dio',
    story: 'Monk. Mode.',
  },
};

// Solal — #180, Calafell beach sunrise
photos[180] = {
  ...photos[180],
  highlight: {
    friendName: 'Solal',
    story: 'We walked to the beach because they wouldn\'t let us drive. Thank god they didn\'t. Penjamin Franklin, the lifeguard tower, a bottle of vodka.',
  },
};

// Gonza — #187, Barcelona beach
photos[187] = {
  ...photos[187],
  highlight: {
    friendName: 'Gonza',
    story: 'On paper, everything about that night was wrong — staying out until sunrise, the beach, the water. But Dro was there, and somehow that made it one of the best memories I have from Barcelona.',
  },
};

// Dio — TBD, uncomment and fill when he responds
// photos[NUMBER] = {
//   ...photos[NUMBER],
//   highlight: {
//     friendName: 'Dio',
//     story: '[Their story]',
//     quote: '[Their quote]',
//   },
// };

// Emanuel — #287, Puerto Rico
photos[287] = {
  ...photos[287],
  highlight: {
    friendName: 'Emanuel',
    story: 'El duo intenso on an post-sanse recovery trip to culebra, colorized 2026.',
  },
};
