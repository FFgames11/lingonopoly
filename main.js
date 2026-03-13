const rollFaces = [1, 2, 3, 4, 5, 6];
const stepDelayMs = 260;
const diceAnimationMs = 1100;
const defaultDiceCount = 15;
const coinRewardPerStep = 38;
const wordMatchRewardCoins = 180;
const wordMatchTimeLimitSeconds = 25;
const sentencePracticeRewardCoins = 160;
const sentencePracticeTimeLimitSeconds = 30;
const eventTileRewardCoins = 110;
const jailCoinPenalty = 120;
const jailDicePenalty = 2;
const phonicsTileLabel = 'Lexicon Link';
const persistedStateKey = 'english-town-state-v3';
const tileWidth = 114;
const tileHeight = 64;
const originX = 160;
const originY = 80;
const freeDiceOffers = [
  {
    id: 'build-5-houses',
    label: 'Build 5 houses',
    reward: 5,
  },
];
const wordMatchVocabularyPool = [
  { id: 'apple', word: 'apple', translation: '苹果' },
  { id: 'book', word: 'book', translation: '书' },
  { id: 'water', word: 'water', translation: '水' },
  { id: 'teacher', word: 'teacher', translation: '老师' },
  { id: 'house', word: 'house', translation: '房子' },
  { id: 'school', word: 'school', translation: '学校' },
  { id: 'friend', word: 'friend', translation: '朋友' },
  { id: 'market', word: 'market', translation: '市场' },
  { id: 'sun', word: 'sun', translation: '太阳' },
  { id: 'train', word: 'train', translation: '火车' },
];
const sentencePracticePuzzles = [
  {
    id: 'read-books',
    clue: 'Arrange the words to describe an after-school habit.',
    translation: 'I read books after school.',
    words: ['I', 'read', 'books', 'after', 'school'],
  },
  {
    id: 'practice-english',
    clue: 'Build a sentence about a daily learning routine.',
    translation: 'We practice English every morning.',
    words: ['We', 'practice', 'English', 'every', 'morning'],
  },
  {
    id: 'grandmother-church',
    clue: 'Build a sentence about where a family member lives.',
    translation: 'My grandmother lives near church.',
    words: ['My', 'grandmother', 'lives', 'near', 'church'],
  },
];
const eventConversationLines = [
  { speaker: 'Guide', text: 'The town square is lively today. Listen closely to how people greet each other.' },
  { speaker: 'Mayor', text: 'Good morning. Clear sentences help everyone understand directions and ideas.' },
  { speaker: 'Guide', text: 'You stayed for the full conversation. Here is a small coin bonus for your attention.' },
];

const pipLayout = {
  1: [[50, 50]],
  2: [
    [32, 32],
    [68, 68],
  ],
  3: [
    [32, 32],
    [50, 50],
    [68, 68],
  ],
  4: [
    [32, 32],
    [68, 32],
    [32, 68],
    [68, 68],
  ],
  5: [
    [32, 32],
    [68, 32],
    [50, 50],
    [32, 68],
    [68, 68],
  ],
  6: [
    [32, 28],
    [68, 28],
    [32, 50],
    [68, 50],
    [32, 72],
    [68, 72],
  ],
};

const cubeFaceMap = {
  1: { top: 2, side: 3 },
  2: { top: 6, side: 3 },
  3: { top: 2, side: 6 },
  4: { top: 2, side: 1 },
  5: { top: 1, side: 3 },
  6: { top: 2, side: 4 },
};

const cubePlanes = {
  front: {
    origin: [24, 28],
    xAxis: [31, 0],
    yAxis: [0, 36],
    radius: 3.6,
    color: '#d13f35',
    opacity: 1,
  },
  top: {
    origin: [24, 28],
    xAxis: [31, 0],
    yAxis: [21, -12],
    radius: 2.5,
    color: '#d24d43',
    opacity: 0.95,
  },
  side: {
    origin: [55, 28],
    xAxis: [21, -12],
    yAxis: [0, 36],
    radius: 2.7,
    color: '#bc3229',
    opacity: 0.92,
  },
};

const startTileLabel = 'Launchpad';
const sentencePracticeTileLabel = 'Sentence Studio';
const eventTileLabel = 'Listening Lounge';
const jailTileLabel = 'Jail';
const propertyCatalog = {
  church: { label: 'Church', costs: [120, 220, 360] },
  bank: {
    label: 'Bank',
    costs: [140, 240, 390],
    art: {
      src: './assets/buildings/banklv1.png',
      width: 168,
      anchorX: 84,
      anchorY: 122,
    },
  },
  townHall: { label: 'Town Hall', costs: [160, 260, 420] },
  ancestralHouse: { label: 'Ancestral House', costs: [130, 230, 370] },
  commercialCenter: { label: 'Commercial Building', costs: [150, 270, 430] },
  library: { label: 'Library', costs: [135, 235, 380] },
  marketHall: { label: 'Market Hall', costs: [145, 250, 400] },
  bakery: { label: 'Bakery', costs: [125, 215, 345] },
  schoolhouse: { label: 'Schoolhouse', costs: [155, 255, 410] },
  clinic: { label: 'Clinic', costs: [150, 245, 395] },
  communityHall: { label: 'Community Hall', costs: [145, 240, 385] },
  teaHouse: { label: 'Tea House', costs: [130, 225, 355] },
  guildOffice: { label: 'Guild Office', costs: [150, 250, 405] },
};
const boardTileBlueprints = [
  { kind: 'start', label: startTileLabel },
  { kind: 'word_plot', propertyId: 'church' },
  { kind: 'sentence_practice', label: sentencePracticeTileLabel },
  { kind: 'word_plot', propertyId: 'bank' },
  { kind: 'phonics_challenge', label: phonicsTileLabel },
  { kind: 'word_plot', propertyId: 'townHall' },
  { kind: 'event', label: eventTileLabel },
  { kind: 'word_plot', propertyId: 'ancestralHouse' },
  { kind: 'sentence_practice', label: sentencePracticeTileLabel },
  { kind: 'word_plot', propertyId: 'commercialCenter' },
  { kind: 'phonics_challenge', label: phonicsTileLabel },
  { kind: 'word_plot', propertyId: 'library' },
  { kind: 'jail', label: jailTileLabel },
  { kind: 'word_plot', propertyId: 'marketHall' },
  { kind: 'event', label: eventTileLabel },
  { kind: 'word_plot', propertyId: 'bakery' },
  { kind: 'sentence_practice', label: sentencePracticeTileLabel },
  { kind: 'word_plot', propertyId: 'schoolhouse' },
  { kind: 'phonics_challenge', label: phonicsTileLabel },
  { kind: 'word_plot', propertyId: 'clinic' },
  { kind: 'event', label: eventTileLabel },
  { kind: 'word_plot', propertyId: 'communityHall' },
  { kind: 'word_plot', propertyId: 'teaHouse' },
  { kind: 'word_plot', propertyId: 'guildOffice' },
];

const tileThemes = {
  orangeHome: {
    top: '#ffba4f',
    bottom: '#f88d1f',
    edge: '#d96e12',
    edgeDark: '#b55508',
    shadow: 'rgba(167, 88, 17, 0.28)',
    glow: 'rgba(255, 195, 110, 0.44)',
    icon: `
      <svg aria-hidden="true" class="tile-icon-svg" viewBox="0 0 64 64">
        <circle cx="32" cy="32" fill="none" r="17" stroke="currentColor" stroke-width="4.5"></circle>
        <path d="M23 35.5V30.5L32 24L41 30.5V39.5H34.5V34.5H29.5V39.5H23Z" fill="currentColor"></path>
      </svg>
    `,
  },
  pinkPlay: {
    top: '#e57ae4',
    bottom: '#c64fcc',
    edge: '#a632ae',
    edgeDark: '#85238b',
    shadow: 'rgba(139, 38, 146, 0.25)',
    glow: 'rgba(238, 154, 246, 0.36)',
    icon: `
      <svg aria-hidden="true" class="tile-icon-svg" viewBox="0 0 64 64">
        <circle cx="32" cy="32" fill="none" r="17" stroke="currentColor" stroke-width="4.5"></circle>
        <path d="M29.5 26.5L38.5 32L29.5 37.5V26.5Z" fill="currentColor"></path>
      </svg>
    `,
  },
  blueSpark: {
    top: '#76b8ff',
    bottom: '#4291f1',
    edge: '#2b73db',
    edgeDark: '#1f57af',
    shadow: 'rgba(33, 91, 171, 0.26)',
    glow: 'rgba(147, 205, 255, 0.34)',
    icon: `
      <svg aria-hidden="true" class="tile-icon-svg" viewBox="0 0 64 64">
        <path d="M32 16L37.2 25.6L48 23L44.4 33.1L53 40L41.7 41.4L40 52L32 44.8L24 52L22.3 41.4L11 40L19.6 33.1L16 23L26.8 25.6L32 16Z" fill="currentColor"></path>
      </svg>
    `,
  },
  goldCheck: {
    top: '#f1d65b',
    bottom: '#d6b438',
    edge: '#b58f18',
    edgeDark: '#8d6f11',
    shadow: 'rgba(137, 111, 17, 0.24)',
    glow: 'rgba(246, 223, 111, 0.36)',
    icon: `
      <svg aria-hidden="true" class="tile-icon-svg" viewBox="0 0 64 64">
        <circle cx="32" cy="32" fill="none" r="17" stroke="currentColor" stroke-width="4.5"></circle>
        <path d="M25.5 32.5L30 37L39 28" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4.5"></path>
      </svg>
    `,
  },
  slateBars: {
    top: '#85919c',
    bottom: '#606c77',
    edge: '#49545e',
    edgeDark: '#374049',
    shadow: 'rgba(52, 61, 69, 0.28)',
    glow: 'rgba(167, 179, 190, 0.2)',
    icon: `
      <svg aria-hidden="true" class="tile-icon-svg" viewBox="0 0 64 64">
        <path d="M22 22L29 18L29 46L22 50V22Z" fill="currentColor" opacity="0.92"></path>
        <path d="M32 18L39 14L39 42L32 46V18Z" fill="currentColor" opacity="0.78"></path>
        <path d="M42 22L49 18L49 46L42 50V22Z" fill="currentColor" opacity="0.64"></path>
      </svg>
    `,
  },
  periwinkleMark: {
    top: '#93a8e3',
    bottom: '#6e84c8',
    edge: '#5267a6',
    edgeDark: '#3f507f',
    shadow: 'rgba(73, 92, 152, 0.24)',
    glow: 'rgba(179, 194, 245, 0.22)',
    icon: `
      <svg aria-hidden="true" class="tile-icon-svg" viewBox="0 0 64 64">
        <path d="M32 22L36.5 27.5L44 32L36.5 36.5L32 42L27.5 36.5L20 32L27.5 27.5L32 22Z" fill="currentColor"></path>
      </svg>
    `,
  },
  regularMint: {
    top: '#dcf5e7',
    bottom: '#b8e0ca',
    edge: '#93c7af',
    edgeDark: '#78aa92',
    shadow: 'rgba(69, 124, 99, 0.16)',
    glow: 'rgba(205, 242, 223, 0.12)',
    icon: '',
  },
  regularStone: {
    top: '#edf1f7',
    bottom: '#d9dfeb',
    edge: '#bcc7d8',
    edgeDark: '#99a7bb',
    shadow: 'rgba(82, 94, 121, 0.16)',
    glow: 'rgba(226, 233, 243, 0.12)',
    icon: '',
  },
};

const regularTileThemes = [tileThemes.regularMint, tileThemes.regularStone];
const persistedStateFields = ['position', 'diceCount', 'diceMax', 'overflowDice', 'coins', 'lastRoll', 'activeFreeDiceOfferId', 'properties'];

const state = {
  tiles: [],
  position: 0,
  diceFace: 1,
  diceCount: defaultDiceCount,
  diceMax: defaultDiceCount,
  overflowDice: 0,
  coins: 0,
  lastRoll: null,
  status: 'Loading board...',
  boardMode: 'solo',
  isRolling: false,
  isMoving: false,
  isMiniGameOpen: false,
  isSentenceGameOpen: false,
  isDialogOpen: false,
  facing: 'SE',
  isJumping: false,
  activeFreeDiceOfferId: freeDiceOffers[0]?.id ?? null,
  properties: {},
  miniGamePairs: [],
  miniGameTranslations: [],
  miniGameMatchedIds: [],
  miniGameSelectedWordId: null,
  miniGameSelectedTranslationId: null,
  miniGameStatus: 'Pick a word, then choose the matching translation.',
  miniGameTimeLeft: wordMatchTimeLimitSeconds,
  miniGameResult: null,
  sentencePuzzle: null,
  sentenceWordBank: [],
  sentenceSelectedWords: [],
  sentenceTimeLeft: sentencePracticeTimeLimitSeconds,
  sentenceStatus: 'Tap the words in the correct order.',
  sentenceResult: null,
  dialogMode: null,
  dialogTileIndex: null,
  dialogPropertyId: null,
  dialogConversationStep: 0,
  dialogStatus: '',
};

let diceIntervalId = null;
let statusTimeoutId = null;
let miniGameTimerId = null;
let sentenceGameTimerId = null;

function getDirection(from, to) {
  const dx = to.gridX - from.gridX;
  const dy = to.gridY - from.gridY;

  if (dx > 0) return 'SE';
  if (dx < 0) return 'NW';
  if (dy > 0) return 'SW';
  if (dy < 0) return 'NE';
  return state.facing;
}

const dom = {
  status: document.querySelector('[data-role="status"]'),
  progressLabel: document.querySelector('[data-role="progress-label"]'),
  coinCount: document.querySelector('[data-role="coin-count"]'),
  lastRoll: document.querySelector('[data-role="last-roll"]'),
  boardMode: document.querySelector('[data-role="board-mode"]'),
  rollTrigger: document.querySelector('[data-role="roll-trigger"]'),
  diceArt: document.querySelector('[data-role="dice-art"]'),
  diceLabel: document.querySelector('.dice-label'),
  diceCount: document.querySelector('[data-role="dice-count"]'),
  diceOverflow: document.querySelector('[data-role="dice-overflow"]'),
  diceMeterTrack: document.querySelector('[data-role="dice-meter-track"]'),
  diceMeterFill: document.querySelector('[data-role="dice-meter-fill"]'),
  diceStoreTrigger: document.querySelector('[data-role="dice-store-trigger"]'),
  freeDiceClaim: document.querySelector('[data-role="free-dice-claim"]'),
  freeDiceLabel: document.querySelector('[data-role="free-dice-label"]'),
  minigameModal: document.querySelector('[data-role="minigame-modal"]'),
  minigameTitle: document.querySelector('[data-role="minigame-title"]'),
  minigameTimer: document.querySelector('[data-role="minigame-timer"]'),
  minigameReward: document.querySelector('[data-role="minigame-reward"]'),
  minigameCopy: document.querySelector('[data-role="minigame-copy"]'),
  minigameWordList: document.querySelector('[data-role="word-list"]'),
  minigameTranslationList: document.querySelector('[data-role="translation-list"]'),
  minigameStatus: document.querySelector('[data-role="minigame-status"]'),
  minigameProgress: document.querySelector('[data-role="minigame-progress"]'),
  minigameAction: document.querySelector('[data-role="minigame-action"]'),
  sentenceModal: document.querySelector('[data-role="sentence-modal"]'),
  sentenceTitle: document.querySelector('[data-role="sentence-title"]'),
  sentenceTimer: document.querySelector('[data-role="sentence-timer"]'),
  sentenceReward: document.querySelector('[data-role="sentence-reward"]'),
  sentenceClue: document.querySelector('[data-role="sentence-clue"]'),
  sentenceTarget: document.querySelector('[data-role="sentence-target"]'),
  sentenceBuilder: document.querySelector('[data-role="sentence-builder"]'),
  sentenceBank: document.querySelector('[data-role="sentence-bank"]'),
  sentenceStatus: document.querySelector('[data-role="sentence-status"]'),
  sentenceProgress: document.querySelector('[data-role="sentence-progress"]'),
  sentenceClear: document.querySelector('[data-role="sentence-clear"]'),
  sentenceAction: document.querySelector('[data-role="sentence-action"]'),
  dialogModal: document.querySelector('[data-role="dialog-modal"]'),
  dialogKicker: document.querySelector('[data-role="dialog-kicker"]'),
  dialogTitle: document.querySelector('[data-role="dialog-title"]'),
  dialogCopy: document.querySelector('[data-role="dialog-copy"]'),
  dialogMeta: document.querySelector('[data-role="dialog-meta"]'),
  dialogStatus: document.querySelector('[data-role="dialog-status"]'),
  dialogPrimary: document.querySelector('[data-role="dialog-primary"]'),
  dialogSecondary: document.querySelector('[data-role="dialog-secondary"]'),
  boardStage: document.querySelector('[data-role="board-stage"]'),
  boardPlane: document.querySelector('[data-role="board-plane"]'),
};

function delay(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function getRandomFace() {
  return rollFaces[Math.floor(Math.random() * rollFaces.length)];
}

function shuffleArray(items) {
  const nextItems = [...items];

  for (let index = nextItems.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [nextItems[index], nextItems[swapIndex]] = [nextItems[swapIndex], nextItems[index]];
  }

  return nextItems;
}

function stopMiniGameTimer() {
  if (miniGameTimerId) {
    window.clearInterval(miniGameTimerId);
    miniGameTimerId = null;
  }
}

function stopSentenceGameTimer() {
  if (sentenceGameTimerId) {
    window.clearInterval(sentenceGameTimerId);
    sentenceGameTimerId = null;
  }
}

function buildDefaultPropertiesState() {
  return Object.fromEntries(
    Object.keys(propertyCatalog).map((propertyId) => [propertyId, { level: 0 }]),
  );
}

function normalizePersistedProperties(properties) {
  const defaultProperties = buildDefaultPropertiesState();

  if (!properties || typeof properties !== 'object') {
    return defaultProperties;
  }

  return Object.fromEntries(
    Object.keys(propertyCatalog).map((propertyId) => {
      const level = clampInteger(properties[propertyId]?.level ?? 0, 0, 3);
      return [propertyId, { level }];
    }),
  );
}

function isAnyModalOpen() {
  return state.isMiniGameOpen || state.isSentenceGameOpen || state.isDialogOpen;
}

function clampInteger(value, minimum, maximum) {
  if (!Number.isFinite(value)) {
    return minimum;
  }

  const nextValue = Math.trunc(value);
  return Math.min(Math.max(nextValue, minimum), maximum);
}

function buildWordMatchPairs() {
  return shuffleArray(wordMatchVocabularyPool).slice(0, 5);
}

function buildSentencePuzzle() {
  const puzzle = shuffleArray(sentencePracticePuzzles)[0];

  return {
    ...puzzle,
    bank: shuffleArray(puzzle.words),
  };
}

function getRegularTileTheme(index) {
  return regularTileThemes[index % regularTileThemes.length];
}

function getTileThemeForBlueprint(kind, index) {
  if (kind === 'start') {
    return tileThemes.orangeHome;
  }

  if (kind === 'word_plot') {
    return getRegularTileTheme(index);
  }

  if (kind === 'sentence_practice') {
    return tileThemes.goldCheck;
  }

  if (kind === 'phonics_challenge') {
    return tileThemes.blueSpark;
  }

  if (kind === 'event') {
    return tileThemes.periwinkleMark;
  }

  if (kind === 'jail') {
    return tileThemes.slateBars;
  }

  return tileThemes.regularStone;
}

function getPersistedSnapshot() {
  if (typeof window === 'undefined' || !window.localStorage) {
    return null;
  }

  try {
    const rawValue = window.localStorage.getItem(persistedStateKey);
    return rawValue ? JSON.parse(rawValue) : null;
  } catch {
    return null;
  }
}

function normalizePersistedSnapshot(snapshot, tileCount) {
  if (!snapshot || typeof snapshot !== 'object') {
    return null;
  }

  const normalizedOfferId =
    snapshot.activeFreeDiceOfferId === null
      ? null
      : freeDiceOffers.some((offer) => offer.id === snapshot.activeFreeDiceOfferId)
        ? snapshot.activeFreeDiceOfferId
        : freeDiceOffers[0]?.id ?? null;

  return {
    position: clampInteger(snapshot.position ?? 0, 0, Math.max(tileCount - 1, 0)),
    diceCount: clampInteger(snapshot.diceCount ?? defaultDiceCount, 0, defaultDiceCount),
    diceMax: defaultDiceCount,
    overflowDice: Math.max(0, Math.trunc(snapshot.overflowDice ?? 0)),
    coins: Math.max(0, Math.trunc(snapshot.coins ?? 0)),
    lastRoll: rollFaces.includes(snapshot.lastRoll) ? snapshot.lastRoll : null,
    activeFreeDiceOfferId: normalizedOfferId,
    properties: normalizePersistedProperties(snapshot.properties),
  };
}

function persistStateSnapshot() {
  if (typeof window === 'undefined' || !window.localStorage || !state.tiles.length) {
    return;
  }

  const snapshot = {
    position: state.position,
    diceCount: state.diceCount,
    diceMax: state.diceMax,
    overflowDice: state.overflowDice,
    coins: state.coins,
    lastRoll: state.lastRoll,
    activeFreeDiceOfferId: state.activeFreeDiceOfferId,
    properties: state.properties,
  };

  try {
    window.localStorage.setItem(persistedStateKey, JSON.stringify(snapshot));
  } catch {
    // Ignore storage write failures and keep the session running.
  }
}

function getActiveFreeDiceOffer() {
  return freeDiceOffers.find((offer) => offer.id === state.activeFreeDiceOfferId) ?? null;
}

function getDiceFillPercent() {
  if (state.diceMax === 0) {
    return 0;
  }

  return Math.max(0, Math.min(100, (state.diceCount / state.diceMax) * 100));
}

function applyDicePenalty(penalty) {
  let remainingPenalty = penalty;
  let nextOverflowDice = state.overflowDice;
  let nextDiceCount = state.diceCount;

  if (nextOverflowDice > 0) {
    const overflowLoss = Math.min(nextOverflowDice, remainingPenalty);
    nextOverflowDice -= overflowLoss;
    remainingPenalty -= overflowLoss;
  }

  if (remainingPenalty > 0) {
    nextDiceCount = Math.max(0, nextDiceCount - remainingPenalty);
  }

  return {
    diceCount: nextDiceCount,
    overflowDice: nextOverflowDice,
  };
}

function canRollDice() {
  return state.tiles.length > 0 && !state.isRolling && !state.isMoving && !isAnyModalOpen() && state.diceCount + state.overflowDice > 0;
}

function projectPointToPlane([u, v], plane) {
  return [
    plane.origin[0] + plane.xAxis[0] * u + plane.yAxis[0] * v,
    plane.origin[1] + plane.xAxis[1] * u + plane.yAxis[1] * v,
  ];
}

function getPipMarkup(face, planeName, variant) {
  const plane = cubePlanes[planeName];

  return pipLayout[face]
    .map(([cx, cy]) => {
      const [projectedX, projectedY] = projectPointToPlane([cx / 100, cy / 100], plane);
      return `
        <circle
          clip-path="url(#clip-${planeName}-${variant})"
          cx="${projectedX.toFixed(2)}"
          cy="${projectedY.toFixed(2)}"
          fill="${plane.color}"
          opacity="${plane.opacity}"
          r="${plane.radius}"
        ></circle>
        <circle
          clip-path="url(#clip-${planeName}-${variant})"
          cx="${projectedX.toFixed(2)}"
          cy="${(projectedY - 0.85).toFixed(2)}"
          fill="#ffffff"
          opacity="0.4"
          r="${(plane.radius * 0.46).toFixed(2)}"
        ></circle>
      `;
    })
    .join('');
}

function toScreenPosition(x, y) {
  const isoX = (x - y) * (tileWidth / 2);
  const isoY = (x + y) * (tileHeight / 2);

  return {
    screenX: Math.round(originX + isoX),
    screenY: Math.round(originY + isoY),
  };
}

function getTileStyle(tile) {
  return [
    `left:${tile.screenX}px`,
    `top:${tile.screenY}px`,
    `z-index:${tile.screenY}`,
    `--tile-top:${tile.theme.top}`,
    `--tile-bottom:${tile.theme.bottom}`,
    `--tile-edge:${tile.theme.edge}`,
    `--tile-edge-dark:${tile.theme.edgeDark}`,
    `--tile-shadow:${tile.theme.shadow}`,
    `--tile-glow:${tile.theme.glow}`,
  ].join(';');
}

function buildRingCoordinates(size) {
  const max = size - 1;
  const coords = [];

  for (let x = 0; x <= max; x += 1) {
    coords.push({ x, y: 0 });
  }

  for (let y = 1; y <= max; y += 1) {
    coords.push({ x: max, y });
  }

  for (let x = max - 1; x >= 0; x -= 1) {
    coords.push({ x, y: max });
  }

  for (let y = max - 1; y >= 1; y -= 1) {
    coords.push({ x: 0, y });
  }

  return coords;
}

function buildTiles() {
  const coordinates = buildRingCoordinates(7);
  return coordinates.map((coord, index) => {
    const blueprint = boardTileBlueprints[index];
    const theme = getTileThemeForBlueprint(blueprint.kind, index);
    const propertyMeta = blueprint.propertyId ? propertyCatalog[blueprint.propertyId] : null;

    return {
      id: `tile-${index}`,
      label: blueprint.label || propertyMeta?.label || `Tile ${index + 1}`,
      kind: blueprint.kind,
      theme,
      icon: theme.icon,
      propertyId: blueprint.propertyId ?? null,
      propertyLabel: propertyMeta?.label ?? null,
      propertyCosts: propertyMeta?.costs ?? null,
      propertyArt: propertyMeta?.art ?? null,
      gridX: coord.x,
      gridY: coord.y,
      ...toScreenPosition(coord.x, coord.y),
    };
  });
}

function getStructureOffset(tile) {
  const maxGrid = 6;

  if (tile.gridY === 0) {
    return { x: -4, y: -92 };
  }

  if (tile.gridX === maxGrid) {
    return { x: 86, y: -12 };
  }

  if (tile.gridY === maxGrid) {
    return { x: -4, y: 86 };
  }

  return { x: -98, y: -12 };
}

function getStructureStyle(tile) {
  const offset = getStructureOffset(tile);
  const anchorX = tile.propertyArt?.anchorX ?? 48;
  const anchorY = tile.propertyArt?.anchorY ?? 42;
  const width = tile.propertyArt?.width ?? 96;

  return [
    `left:${tile.screenX + tileWidth / 2 - anchorX + offset.x}px`,
    `top:${tile.screenY + tileHeight / 2 - anchorY + offset.y}px`,
    `z-index:${tile.screenY + 2}`,
    `--structure-width:${width}px`,
  ].join(';');
}

function getDiceMarkup(face, className, variant) {
  const orientation = cubeFaceMap[face];

  return `
    <svg aria-hidden="true" class="dice-vector ${className}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="frontGradient-${variant}" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stop-color="#fffdfa"></stop>
          <stop offset="56%" stop-color="#f4f1eb"></stop>
          <stop offset="100%" stop-color="#d9d4cb"></stop>
        </linearGradient>
        <linearGradient id="topGradient-${variant}" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stop-color="#ffffff"></stop>
          <stop offset="100%" stop-color="#ece6dc"></stop>
        </linearGradient>
        <linearGradient id="sideGradient-${variant}" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stop-color="#dad3c9"></stop>
          <stop offset="100%" stop-color="#b8afa4"></stop>
        </linearGradient>
        <clipPath id="clip-front-${variant}">
          <rect x="24" y="28" width="31" height="36" rx="7"></rect>
        </clipPath>
        <clipPath id="clip-top-${variant}">
          <path d="M24 28L55 28L76 16L45 16Z"></path>
        </clipPath>
        <clipPath id="clip-side-${variant}">
          <path d="M55 28L76 16L76 52L55 64Z"></path>
        </clipPath>
      </defs>
      <ellipse cx="48" cy="79" fill="rgba(40, 25, 18, 0.18)" rx="26" ry="8"></ellipse>
      <path d="M24 28L55 28L76 16L45 16Z" fill="url(#topGradient-${variant})" stroke="#d8d1c8" stroke-width="1.5"></path>
      <path d="M55 28L76 16L76 52L55 64Z" fill="url(#sideGradient-${variant})" stroke="#b1a89d" stroke-width="1.5"></path>
      <rect x="24" y="28" width="31" height="36" rx="7" fill="url(#frontGradient-${variant})" stroke="#d7d1c8" stroke-width="1.5"></rect>
      ${getPipMarkup(orientation.top, 'top', variant)}
      ${getPipMarkup(orientation.side, 'side', variant)}
      ${getPipMarkup(face, 'front', variant)}
      <path d="M29 23C35 19 42 17 51 17" fill="none" opacity="0.82" stroke="#ffffff" stroke-linecap="round" stroke-width="4"></path>
      <path d="M30 33C34 30 40 29 47 29" fill="none" opacity="0.35" stroke="#ffffff" stroke-linecap="round" stroke-width="3"></path>
    </svg>
  `;
}

function renderDice(face) {
  const leftFace = face === 1 ? 6 : face - 1;
  const rightFace = face === 6 ? 1 : face + 1;

  dom.diceArt.innerHTML = `
    <span class="dice-pulse-ring"></span>
    ${getDiceMarkup(leftFace, 'dice-ghost ghost-left', `ghost-left-${face}`)}
    ${getDiceMarkup(rightFace, 'dice-ghost ghost-right', `ghost-right-${face}`)}
    ${getDiceMarkup(face, 'dice-main', `main-${face}`)}
  `;
}

function openWordMatchMiniGame() {
  stopMiniGameTimer();
  const miniGamePairs = buildWordMatchPairs();

  updateState({
    isMiniGameOpen: true,
    miniGamePairs,
    miniGameTranslations: shuffleArray(miniGamePairs),
    miniGameMatchedIds: [],
    miniGameSelectedWordId: null,
    miniGameSelectedTranslationId: null,
    miniGameStatus: 'Pick a word, then choose the matching translation.',
    miniGameTimeLeft: wordMatchTimeLimitSeconds,
    miniGameResult: null,
    status: `${phonicsTileLabel} opened. Match all 5 words before time runs out.`,
  });

  miniGameTimerId = window.setInterval(() => {
    if (state.miniGameResult) {
      stopMiniGameTimer();
      return;
    }

    if (state.miniGameTimeLeft <= 1) {
      stopMiniGameTimer();
      updateState({
        miniGameTimeLeft: 0,
        miniGameResult: 'failure',
        miniGameSelectedWordId: null,
        miniGameSelectedTranslationId: null,
        miniGameStatus: 'Time is up. No bonus coins this round.',
        status: `${phonicsTileLabel} ended. No bonus coins earned.`,
      });
      return;
    }

    updateState({
      miniGameTimeLeft: state.miniGameTimeLeft - 1,
    });
  }, 1000);
}

function closeWordMatchMiniGame() {
  stopMiniGameTimer();
  updateState({
    isMiniGameOpen: false,
    miniGamePairs: [],
    miniGameTranslations: [],
    miniGameMatchedIds: [],
    miniGameSelectedWordId: null,
    miniGameSelectedTranslationId: null,
    miniGameTimeLeft: wordMatchTimeLimitSeconds,
    miniGameResult: null,
    miniGameStatus: 'Pick a word, then choose the matching translation.',
  });
}

function resolveWordMatchSelection() {
  if (!state.miniGameSelectedWordId || !state.miniGameSelectedTranslationId) {
    return;
  }

  const isCorrect = state.miniGameSelectedWordId === state.miniGameSelectedTranslationId;

  if (!isCorrect) {
    updateState({
      miniGameSelectedWordId: null,
      miniGameSelectedTranslationId: null,
      miniGameStatus: 'That pair does not match. Try again.',
    });
    return;
  }

  const nextMatchedIds = [...state.miniGameMatchedIds, state.miniGameSelectedWordId];
  const completedAllPairs = nextMatchedIds.length === state.miniGamePairs.length;

  if (completedAllPairs) {
    stopMiniGameTimer();
    updateState({
      coins: state.coins + wordMatchRewardCoins,
      miniGameMatchedIds: nextMatchedIds,
      miniGameSelectedWordId: null,
      miniGameSelectedTranslationId: null,
      miniGameResult: 'success',
      miniGameStatus: `Perfect. You earned +${wordMatchRewardCoins} bonus coins.`,
      status: `${phonicsTileLabel} cleared. +${wordMatchRewardCoins} bonus coins awarded.`,
    });
    return;
  }

  const matchedPair = state.miniGamePairs.find((pair) => pair.id === state.miniGameSelectedWordId);

  updateState({
    miniGameMatchedIds: nextMatchedIds,
    miniGameSelectedWordId: null,
    miniGameSelectedTranslationId: null,
    miniGameStatus: `Matched ${matchedPair?.word || 'one pair'}. Keep going.`,
  });
}

function handleMiniGameChoice(action, choiceId) {
  if (!state.isMiniGameOpen || state.miniGameResult || state.miniGameMatchedIds.includes(choiceId)) {
    return;
  }

  if (action === 'select-word') {
    updateState({
      miniGameSelectedWordId: choiceId,
      miniGameStatus: state.miniGameSelectedTranslationId
        ? state.miniGameStatus
        : 'Now pick the matching Chinese translation.',
    });
  }

  if (action === 'select-translation') {
    updateState({
      miniGameSelectedTranslationId: choiceId,
      miniGameStatus: state.miniGameSelectedWordId
        ? state.miniGameStatus
        : 'Now pick the English word that matches this translation.',
    });
  }

  window.setTimeout(resolveWordMatchSelection, 0);
}

function renderMiniGame() {
  dom.minigameModal.hidden = !state.isMiniGameOpen;

  if (!state.isMiniGameOpen) {
    return;
  }

  const isResolved = Boolean(state.miniGameResult);

  dom.minigameTitle.textContent = phonicsTileLabel;
  dom.minigameTimer.textContent = `${state.miniGameTimeLeft}s`;
  dom.minigameReward.textContent = `+${wordMatchRewardCoins} coins`;
  dom.minigameCopy.textContent = 'Match each English word with its Chinese translation before the timer ends.';
  dom.minigameStatus.textContent = state.miniGameStatus;
  dom.minigameProgress.textContent = `${state.miniGameMatchedIds.length}/${state.miniGamePairs.length} matched`;
  dom.minigameAction.hidden = !isResolved;
  dom.minigameAction.textContent = state.miniGameResult === 'success' ? 'Collect' : 'Continue';

  dom.minigameWordList.innerHTML = state.miniGamePairs
    .map((pair) => {
      const isMatched = state.miniGameMatchedIds.includes(pair.id);
      const classNames = [
        'minigame-choice',
        isMatched ? 'is-matched' : '',
        state.miniGameSelectedWordId === pair.id ? 'is-selected' : '',
        state.miniGameSelectedTranslationId && state.miniGameSelectedTranslationId !== pair.id && !isMatched ? 'is-locked' : '',
      ]
        .filter(Boolean)
        .join(' ');

      return `
        <button class="${classNames}" data-action="select-word" data-choice-id="${pair.id}" ${isMatched || isResolved ? 'disabled' : ''} type="button">
          ${pair.word}
        </button>
      `;
    })
    .join('');

  dom.minigameTranslationList.innerHTML = state.miniGameTranslations
    .map((pair) => {
      const isMatched = state.miniGameMatchedIds.includes(pair.id);
      const classNames = [
        'minigame-choice',
        isMatched ? 'is-matched' : '',
        state.miniGameSelectedTranslationId === pair.id ? 'is-selected' : '',
        state.miniGameSelectedWordId && state.miniGameSelectedWordId !== pair.id && !isMatched ? 'is-locked' : '',
      ]
        .filter(Boolean)
        .join(' ');

      return `
        <button class="${classNames}" data-action="select-translation" data-choice-id="${pair.id}" ${isMatched || isResolved ? 'disabled' : ''} type="button">
          ${pair.translation}
        </button>
      `;
    })
    .join('');
}

function openSentencePracticeGame() {
  stopSentenceGameTimer();
  const puzzle = buildSentencePuzzle();

  updateState({
    isSentenceGameOpen: true,
    sentencePuzzle: puzzle,
    sentenceWordBank: puzzle.bank,
    sentenceSelectedWords: [],
    sentenceTimeLeft: sentencePracticeTimeLimitSeconds,
    sentenceStatus: 'Tap the words in the correct order.',
    sentenceResult: null,
    status: `${sentencePracticeTileLabel} opened. Build the sentence before time runs out.`,
  });

  sentenceGameTimerId = window.setInterval(() => {
    if (state.sentenceResult) {
      stopSentenceGameTimer();
      return;
    }

    if (state.sentenceTimeLeft <= 1) {
      stopSentenceGameTimer();
      updateState({
        sentenceTimeLeft: 0,
        sentenceResult: 'failure',
        sentenceStatus: 'Time is up. No bonus coins this round.',
        status: `${sentencePracticeTileLabel} ended. No bonus coins earned.`,
      });
      return;
    }

    updateState({
      sentenceTimeLeft: state.sentenceTimeLeft - 1,
    });
  }, 1000);
}

function closeSentencePracticeGame() {
  stopSentenceGameTimer();
  updateState({
    isSentenceGameOpen: false,
    sentencePuzzle: null,
    sentenceWordBank: [],
    sentenceSelectedWords: [],
    sentenceTimeLeft: sentencePracticeTimeLimitSeconds,
    sentenceStatus: 'Tap the words in the correct order.',
    sentenceResult: null,
  });
}

function handleSentenceWordSelect(word) {
  if (!state.isSentenceGameOpen || state.sentenceResult || state.sentenceSelectedWords.includes(word)) {
    return;
  }

  const nextSelectedWords = [...state.sentenceSelectedWords, word];
  const completedSentence = nextSelectedWords.length === state.sentencePuzzle.words.length;

  if (!completedSentence) {
    updateState({
      sentenceSelectedWords: nextSelectedWords,
      sentenceStatus: 'Keep going.',
    });
    return;
  }

  const isCorrect = nextSelectedWords.every((selectedWord, index) => selectedWord === state.sentencePuzzle.words[index]);

  if (!isCorrect) {
    updateState({
      sentenceSelectedWords: [],
      sentenceStatus: 'That order is not correct. Try again.',
    });
    return;
  }

  stopSentenceGameTimer();
  updateState({
    coins: state.coins + sentencePracticeRewardCoins,
    sentenceSelectedWords: nextSelectedWords,
    sentenceResult: 'success',
    sentenceStatus: `Great sentence. You earned +${sentencePracticeRewardCoins} coins.`,
    status: `${sentencePracticeTileLabel} cleared. +${sentencePracticeRewardCoins} bonus coins awarded.`,
  });
}

function handleSentenceClear() {
  if (!state.isSentenceGameOpen || state.sentenceResult) {
    return;
  }

  updateState({
    sentenceSelectedWords: [],
    sentenceStatus: 'Sentence cleared. Try again.',
  });
}

function renderSentenceGame() {
  dom.sentenceModal.hidden = !state.isSentenceGameOpen;

  if (!state.isSentenceGameOpen || !state.sentencePuzzle) {
    return;
  }

  const isResolved = Boolean(state.sentenceResult);

  dom.sentenceTitle.textContent = sentencePracticeTileLabel;
  dom.sentenceTimer.textContent = `${state.sentenceTimeLeft}s`;
  dom.sentenceReward.textContent = `+${sentencePracticeRewardCoins} coins`;
  dom.sentenceClue.textContent = state.sentencePuzzle.clue;
  dom.sentenceTarget.textContent = state.sentencePuzzle.translation;
  dom.sentenceStatus.textContent = state.sentenceStatus;
  dom.sentenceProgress.textContent = `${state.sentenceSelectedWords.length}/${state.sentencePuzzle.words.length} placed`;
  dom.sentenceAction.hidden = !isResolved;
  dom.sentenceAction.textContent = state.sentenceResult === 'success' ? 'Collect' : 'Continue';

  dom.sentenceBuilder.innerHTML = state.sentencePuzzle.words
    .map((_, index) => {
      const placedWord = state.sentenceSelectedWords[index];
      const className = placedWord ? 'sentence-chip is-slotted' : 'sentence-chip is-missing';
      return `<span class="${className}">${placedWord || '...'}</span>`;
    })
    .join('');

  dom.sentenceBank.innerHTML = state.sentenceWordBank
    .map((word) => {
      const alreadyUsed = state.sentenceSelectedWords.includes(word);
      return `
        <button class="sentence-chip" data-action="sentence-word" data-word="${word}" ${alreadyUsed || isResolved ? 'disabled' : ''} type="button">
          ${word}
        </button>
      `;
    })
    .join('');
}

function openDialog(mode, options = {}) {
  updateState({
    isDialogOpen: true,
    dialogMode: mode,
    dialogTileIndex: options.tileIndex ?? null,
    dialogPropertyId: options.propertyId ?? null,
    dialogConversationStep: options.step ?? 0,
    dialogStatus: options.status ?? '',
    status: options.boardStatus ?? state.status,
  });
}

function closeDialog() {
  updateState({
    isDialogOpen: false,
    dialogMode: null,
    dialogTileIndex: null,
    dialogPropertyId: null,
    dialogConversationStep: 0,
    dialogStatus: '',
  });
}

function getPropertyLevel(propertyId) {
  return state.properties[propertyId]?.level ?? 0;
}

function updatePropertyLevel(propertyId, nextLevel) {
  updateState({
    properties: {
      ...state.properties,
      [propertyId]: {
        level: nextLevel,
      },
    },
  });
}

function handlePropertyPrimary() {
  const propertyId = state.dialogPropertyId;
  const property = propertyCatalog[propertyId];
  const currentLevel = getPropertyLevel(propertyId);

  if (!property || currentLevel >= 3) {
    closeDialog();
    return;
  }

  const cost = property.costs[currentLevel];
  if (state.coins < cost) {
    updateState({
      dialogStatus: `You need ${cost - state.coins} more coins.`,
    });
    return;
  }

  updateState({
    coins: state.coins - cost,
    dialogStatus: currentLevel === 0 ? `${property.label} purchased.` : `${property.label} upgraded to level ${currentLevel + 1}.`,
    status: currentLevel === 0 ? `${property.label} unlocked.` : `${property.label} upgraded to level ${currentLevel + 1}.`,
  });
  updatePropertyLevel(propertyId, currentLevel + 1);
  closeDialog();
}

function handleEventPrimary() {
  const isLastLine = state.dialogConversationStep >= eventConversationLines.length - 1;

  if (!isLastLine) {
    updateState({
      dialogConversationStep: state.dialogConversationStep + 1,
    });
    return;
  }

  updateState({
    coins: state.coins + eventTileRewardCoins,
    status: `${eventTileLabel} completed. +${eventTileRewardCoins} coins awarded.`,
  });
  closeDialog();
}

function handleJailPrimary() {
  closeDialog();
}

function handleDialogPrimary() {
  if (state.dialogMode === 'property') {
    handlePropertyPrimary();
    return;
  }

  if (state.dialogMode === 'event') {
    handleEventPrimary();
    return;
  }

  handleJailPrimary();
}

function renderDialog() {
  dom.dialogModal.hidden = !state.isDialogOpen;

  if (!state.isDialogOpen) {
    return;
  }

  if (state.dialogMode === 'property') {
    const property = propertyCatalog[state.dialogPropertyId];
    const currentLevel = getPropertyLevel(state.dialogPropertyId);
    const isUnowned = currentLevel === 0;
    const isMaxed = currentLevel >= 3;
    const nextCost = !isMaxed ? property.costs[currentLevel] : null;

    dom.dialogKicker.textContent = 'Word Plot';
    dom.dialogTitle.textContent = property.label;
    dom.dialogCopy.textContent = isUnowned
      ? `Would you like to spend coins to purchase ${property.label}?`
      : isMaxed
        ? `${property.label} is already at its highest level.`
        : `Would you like to upgrade ${property.label} to level ${currentLevel + 1}?`;
    dom.dialogMeta.textContent = isMaxed ? 'Level 3 reached' : `Cost: ${nextCost} coins`;
    dom.dialogStatus.textContent = state.dialogStatus;
    dom.dialogPrimary.textContent = isMaxed ? 'Close' : isUnowned ? 'Purchase' : 'Upgrade';
    dom.dialogSecondary.hidden = isMaxed;
    dom.dialogSecondary.textContent = 'Not now';
    return;
  }

  if (state.dialogMode === 'event') {
    const line = eventConversationLines[state.dialogConversationStep];
    const isLastLine = state.dialogConversationStep >= eventConversationLines.length - 1;

    dom.dialogKicker.textContent = 'Event Tile';
    dom.dialogTitle.textContent = line.speaker;
    dom.dialogCopy.textContent = line.text;
    dom.dialogMeta.textContent = isLastLine ? `Reward: ${eventTileRewardCoins} coins` : `${state.dialogConversationStep + 1}/${eventConversationLines.length}`;
    dom.dialogStatus.textContent = state.dialogStatus;
    dom.dialogPrimary.textContent = isLastLine ? 'Finish' : 'Next';
    dom.dialogSecondary.hidden = true;
    return;
  }

  dom.dialogKicker.textContent = 'Jail Tile';
  dom.dialogTitle.textContent = jailTileLabel;
  dom.dialogCopy.textContent = `You were sent back to ${startTileLabel} and lost ${jailDicePenalty} dice plus ${jailCoinPenalty} coins.`;
  dom.dialogMeta.textContent = 'Penalty applied';
  dom.dialogStatus.textContent = state.dialogStatus;
  dom.dialogPrimary.textContent = 'Continue';
  dom.dialogSecondary.hidden = true;
}

function getLandingStatus(tile, coinsEarned) {
  const coinCopy = `+${coinsEarned} coins.`;

  if (tile.kind === 'word_plot') {
    return `Landed on ${tile.propertyLabel}. ${coinCopy} Decide whether to purchase or upgrade it.`;
  }

  if (tile.kind === 'sentence_practice') {
    return `Landed on ${tile.label}. ${coinCopy} Sentence practice opened.`;
  }

  if (tile.kind === 'phonics_challenge') {
    return `Landed on ${tile.label}. ${coinCopy} Phonics challenge opened.`;
  }

  if (tile.kind === 'event') {
    return `Landed on ${tile.label}. ${coinCopy} A town event has started.`;
  }

  if (tile.kind === 'jail') {
    return `Landed on ${tile.label}. ${coinCopy} Penalty applied and return to ${startTileLabel}.`;
  }

  if (tile.kind === 'start') {
    return `Back at ${tile.label}. ${coinCopy} Roll again when ready.`;
  }

  return `Landed on ${tile.label}. ${coinCopy} Roll again when ready.`;
}

function getResumeStatus(tile) {
  if (tile.kind === 'word_plot') {
    return `Welcome back. You are on ${tile.propertyLabel}. Fixed tile positions restored.`;
  }

  if (tile.kind === 'start') {
    return `Welcome back. You are at ${tile.label}. Fixed tile positions restored.`;
  }

  return `Welcome back. You are on ${tile.label}. Fixed tile positions restored.`;
}

function renderHud() {
  const canRoll = canRollDice();
  const activeFreeDiceOffer = getActiveFreeDiceOffer();

  dom.status.textContent = state.status;
  dom.progressLabel.textContent = state.tiles.length ? `${state.position + 1} / ${state.tiles.length}` : '0 / 0';
  dom.coinCount.textContent = state.coins.toLocaleString();
  dom.lastRoll.textContent = state.lastRoll === null ? '-' : String(state.lastRoll);
  dom.boardMode.textContent = state.boardMode;
  dom.diceCount.textContent = `${state.diceCount}/${state.diceMax}`;
  dom.diceOverflow.hidden = state.overflowDice === 0;
  dom.diceOverflow.textContent = `+${state.overflowDice}`;
  dom.diceMeterFill.style.width = `${getDiceFillPercent()}%`;
  dom.diceMeterTrack.setAttribute('aria-valuemax', String(state.diceMax));
  dom.diceMeterTrack.setAttribute('aria-valuenow', String(state.diceCount));
  dom.rollTrigger.disabled = !canRoll;
  dom.rollTrigger.classList.toggle('is-rolling', state.isRolling);
  dom.rollTrigger.classList.toggle('is-empty', state.diceCount + state.overflowDice === 0);
  dom.diceLabel.textContent = state.isRolling
    ? 'Rolling...'
    : state.isMiniGameOpen
      ? 'Phonics open'
    : state.isSentenceGameOpen
      ? 'Sentence open'
    : state.isDialogOpen
      ? 'Tile dialog open'
    : state.isMoving
      ? 'Moving...'
      : state.diceCount + state.overflowDice > 0
        ? 'Tap to roll'
        : 'Out of dice';
  dom.freeDiceClaim.hidden = !activeFreeDiceOffer;

  if (activeFreeDiceOffer) {
    dom.freeDiceLabel.textContent = activeFreeDiceOffer.label;
  }

  dom.rollTrigger.setAttribute(
    'aria-label',
    state.isRolling
      ? 'Rolling dice'
      : state.isMiniGameOpen
        ? 'Phonics challenge is open'
      : state.isSentenceGameOpen
        ? 'Sentence practice is open'
      : state.isDialogOpen
        ? 'Tile dialog is open'
      : state.isMoving
        ? 'Character is moving'
        : state.diceCount + state.overflowDice === 0
          ? 'No dice left'
          : `Roll dice, ${state.diceCount + state.overflowDice} left`,
  );
}

function renderCamera() {
  if (!state.tiles.length || !dom.boardStage) {
    return;
  }

  const currentTile = state.tiles[state.position];
  const stageWidth = dom.boardStage.clientWidth;
  const stageHeight = dom.boardStage.clientHeight;
  const tileCenterX = currentTile.screenX + tileWidth / 2;
  const tileCenterY = currentTile.screenY + tileHeight / 2;
  const targetX = stageWidth * 0.5;
  const targetY = stageHeight * 0.56;
  const translateX = targetX - tileCenterX;
  const translateY = targetY - tileCenterY;

  dom.boardPlane.style.transform = `translate(${translateX}px, ${translateY}px)`;
}

function renderBoard() {
  const structuresMarkup = state.tiles
    .filter((tile) => tile.kind === 'word_plot' && tile.propertyId)
    .map((tile) => {
      const propertyLevel = state.properties[tile.propertyId]?.level ?? 0;
      const levelLabel = propertyLevel === 0 ? 'For Sale' : `Lv. ${propertyLevel}`;
      const levelNote = propertyLevel === 0 ? 'Tap to buy' : propertyLevel === 3 ? 'Maxed' : 'Upgradeable';
      const hasArt = Boolean(tile.propertyArt);
      const structureClass = hasArt ? `board-structure has-art structure-${tile.propertyId}` : 'board-structure';
      const structureBodyMarkup = hasArt
        ? `
          <img class="board-structure-art" src="${tile.propertyArt.src}" alt="${tile.propertyLabel}">
          <div class="board-structure-info">
            <strong class="board-structure-label">${tile.propertyLabel}</strong>
            <span class="board-structure-level">${levelLabel}</span>
            <span class="board-structure-note">${levelNote}</span>
          </div>
        `
        : `
          <strong class="board-structure-label">${tile.propertyLabel}</strong>
          <span class="board-structure-level">${levelLabel}</span>
          <span class="board-structure-note">${levelNote}</span>
        `;

      return `
        <article class="${structureClass}" data-level="${propertyLevel}" data-property-id="${tile.propertyId}" style="${getStructureStyle(tile)}">
          ${structureBodyMarkup}
        </article>
      `;
    })
    .join('');

  const tilesMarkup = state.tiles
    .map((tile, index) => {
      const currentClass = index === state.position ? 'is-current' : '';
      const iconMarkup = tile.icon ? `<span class="tile-icon" aria-hidden="true">${tile.icon}</span>` : '';
      return `
        <article class="board-tile tile-${tile.kind} ${currentClass}" aria-label="${tile.label}" style="${getTileStyle(tile)}">
          ${iconMarkup}
        </article>
      `;
    })
    .join('');

  const currentTile = state.tiles[state.position];

  // Custom offsets per direction to ensure visual centering on the diamond tiles
  const facingOffsets = {
    'SE': { x: -14, y: 2 },
    'SW': { x: 14, y: 2 },
    'NW': { x: 10, y: 8 },
    'NE': { x: -10, y: 8 }
  };
  const offset = facingOffsets[state.facing] || { x: 0, y: 0 };

  const tokenMarkup = currentTile
    ? `
      <div class="player-token ${state.isJumping ? 'is-jumping' : ''}" 
           data-facing="${state.facing}"
           style="left:${currentTile.screenX + tileWidth / 2 - 48 + offset.x}px;top:${currentTile.screenY + tileHeight / 2 - 112 + offset.y}px;z-index:${currentTile.screenY + 1};">
        <div class="token-shadow"></div>
      </div>
    `
    : '';

  dom.boardPlane.innerHTML = `${tilesMarkup}${structuresMarkup}${tokenMarkup}`;
}
function render() {
  renderHud();
  renderDice(state.diceFace);
  renderBoard();
  renderCamera();
  renderMiniGame();
  renderSentenceGame();
  renderDialog();
}

function updateState(partialState) {
  Object.assign(state, partialState);

  if (partialState.status) {
    dom.status.classList.add('is-active');

    if (statusTimeoutId) {
      window.clearTimeout(statusTimeoutId);
    }

    statusTimeoutId = window.setTimeout(() => {
      dom.status.classList.remove('is-active');
      statusTimeoutId = null;
    }, 3000);
  }

  render();

  if (Object.keys(partialState).some((key) => persistedStateFields.includes(key))) {
    persistStateSnapshot();
  }
}

async function moveToken(steps) {
  updateState({
    isMoving: true,
    status: `Moving ${steps} tile${steps === 1 ? '' : 's'}...`,
  });

  for (let step = 0; step < steps; step += 1) {
    const fromIndex = state.position;
    const nextIndex = (fromIndex + 1) % state.tiles.length;
    
    const direction = getDirection(state.tiles[fromIndex], state.tiles[nextIndex]);
    
    // Start jump
    updateState({ 
      facing: direction,
      isJumping: true 
    });
    
    await delay(stepDelayMs / 2);
    
    // Land on next tile
    updateState({ 
      position: nextIndex,
      isJumping: false,
      coins: state.coins + coinRewardPerStep,
    });
    
    await delay(stepDelayMs / 2);
  }

  const landedTile = state.tiles[state.position];

  updateState({
    isMoving: false,
    lastRoll: steps,
    status: getLandingStatus(landedTile, steps * coinRewardPerStep),
  });

  if (landedTile.kind === 'phonics_challenge') {
    openWordMatchMiniGame();
    return;
  }

  if (landedTile.kind === 'sentence_practice') {
    openSentencePracticeGame();
    return;
  }

  if (landedTile.kind === 'word_plot') {
    openDialog('property', {
      propertyId: landedTile.propertyId,
      tileIndex: state.position,
      boardStatus: getLandingStatus(landedTile, steps * coinRewardPerStep),
    });
    return;
  }

  if (landedTile.kind === 'event') {
    openDialog('event', {
      tileIndex: state.position,
      step: 0,
      boardStatus: getLandingStatus(landedTile, steps * coinRewardPerStep),
    });
    return;
  }

  if (landedTile.kind === 'jail') {
    const nextDiceState = applyDicePenalty(jailDicePenalty);
    const nextCoins = Math.max(0, state.coins - jailCoinPenalty);

    updateState({
      position: 0,
      diceCount: nextDiceState.diceCount,
      overflowDice: nextDiceState.overflowDice,
      coins: nextCoins,
      status: `${jailTileLabel} penalty applied. Back to ${startTileLabel}.`,
    });

    openDialog('jail', {
      tileIndex: 0,
      boardStatus: `${jailTileLabel} penalty applied. Back to ${startTileLabel}.`,
    });
  }
}

async function handleRoll() {
  const canRoll = canRollDice();
  if (!canRoll) {
    if (!state.isRolling && !state.isMoving && state.diceCount + state.overflowDice === 0) {
      updateState({ status: 'No dice left. Claim or buy more when available.' });
    }

    return;
  }

  const nextOverflowDice = state.overflowDice > 0 ? state.overflowDice - 1 : 0;
  const nextBaseDiceCount = state.overflowDice > 0 ? state.diceCount : Math.max(0, state.diceCount - 1);

  updateState({
    diceCount: nextBaseDiceCount,
    overflowDice: nextOverflowDice,
    isRolling: true,
    status: 'Rolling dice...',
  });

  diceIntervalId = window.setInterval(() => {
    updateState({ diceFace: getRandomFace() });
  }, 60);

  await delay(diceAnimationMs);

  if (diceIntervalId) {
    window.clearInterval(diceIntervalId);
    diceIntervalId = null;
  }

  const finalFace = getRandomFace();
  updateState({
    diceFace: finalFace,
    isRolling: false,
  });

  await moveToken(finalFace);
}

function bootstrap() {
  const tiles = buildTiles();
  const persistedSnapshot = normalizePersistedSnapshot(getPersistedSnapshot(), tiles.length);
  const nextPosition = persistedSnapshot?.position ?? 0;
  const currentTile = tiles[nextPosition];

  updateState({
    tiles,
    position: nextPosition,
    diceCount: persistedSnapshot?.diceCount ?? defaultDiceCount,
    diceMax: defaultDiceCount,
    overflowDice: persistedSnapshot?.overflowDice ?? 0,
    coins: persistedSnapshot?.coins ?? 0,
    lastRoll: persistedSnapshot?.lastRoll ?? null,
    activeFreeDiceOfferId: persistedSnapshot?.activeFreeDiceOfferId ?? freeDiceOffers[0]?.id ?? null,
    properties: persistedSnapshot?.properties ?? buildDefaultPropertiesState(),
    isRolling: false,
    isMoving: false,
    isJumping: false,
    status: persistedSnapshot ? getResumeStatus(currentTile) : 'Tap the dice to start your next move.',
  });
}

function handleClaimFreeDice() {
  const activeFreeDiceOffer = getActiveFreeDiceOffer();
  if (!activeFreeDiceOffer) {
    return;
  }

  const nextDiceCount = Math.min(state.diceMax, state.diceCount + activeFreeDiceOffer.reward);
  const overflowDice = Math.max(0, state.diceCount + activeFreeDiceOffer.reward - state.diceMax);

  updateState({
    activeFreeDiceOfferId: null,
    diceCount: nextDiceCount,
    overflowDice: state.overflowDice + overflowDice,
    status:
      overflowDice > 0
        ? `Reward claimed. ${overflowDice} overflow dice added on top of the full meter.`
        : `Free die claimed. ${nextDiceCount} of ${state.diceMax} ready.`,
  });
}

function handleDiceStoreClick() {
  updateState({
    status: 'Dice purchases are not wired yet.',
  });
}

dom.rollTrigger.addEventListener('click', handleRoll);
dom.freeDiceClaim.addEventListener('click', handleClaimFreeDice);
dom.diceStoreTrigger.addEventListener('click', handleDiceStoreClick);
dom.minigameModal.addEventListener('click', (event) => {
  const actionTarget = event.target.closest('[data-action]');
  const actionButton = event.target.closest('[data-role="minigame-action"]');

  if (actionButton) {
    closeWordMatchMiniGame();
    return;
  }

  if (!actionTarget) {
    return;
  }

  handleMiniGameChoice(actionTarget.dataset.action, actionTarget.dataset.choiceId);
});
dom.sentenceModal.addEventListener('click', (event) => {
  const wordButton = event.target.closest('[data-action="sentence-word"]');
  const actionButton = event.target.closest('[data-role="sentence-action"]');
  const clearButton = event.target.closest('[data-role="sentence-clear"]');

  if (actionButton) {
    closeSentencePracticeGame();
    return;
  }

  if (clearButton) {
    handleSentenceClear();
    return;
  }

  if (wordButton) {
    handleSentenceWordSelect(wordButton.dataset.word);
  }
});
dom.dialogPrimary.addEventListener('click', handleDialogPrimary);
dom.dialogSecondary.addEventListener('click', closeDialog);
window.addEventListener('resize', renderCamera);
window.addEventListener('beforeunload', () => {
  if (diceIntervalId) {
    window.clearInterval(diceIntervalId);
  }

  stopMiniGameTimer();
  stopSentenceGameTimer();
});

bootstrap();
