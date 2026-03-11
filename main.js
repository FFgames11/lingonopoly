const rollFaces = [1, 2, 3, 4, 5, 6];
const stepDelayMs = 260;
const diceAnimationMs = 1100;
const tileStepX = 56.5;
const tileStepY = 56.5;
const originX = 214;
const originY = 616;

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

const tileKinds = ['property', 'property', 'event', 'property', 'property', 'event'];
const labels = [
  'Launchpad',
  'Syntax Street',
  'Lucky Draw',
  'Letter Lane',
  'Tile Town',
  'Mystery Card',
  'Market Walk',
  'Verb Vista',
  'Chance Brook',
  'Vowel Vale',
  'Prompt Pier',
  'Story Stop',
  'Fortune Fork',
  'Logic Loop',
  'Puzzle Plaza',
  'Quest Quay',
  'Bonus Bend',
  'Pixel Park',
  'Reward Row',
  'Signal Square',
  'Surprise Step',
  'Grammar Grove',
  'Echo Estate',
  'Final Frame',
];

const state = {
  tiles: [],
  position: 0,
  diceFace: 1,
  lastRoll: null,
  status: 'Loading board...',
  boardMode: 'solo',
  isRolling: false,
  isMoving: false,
};

let diceIntervalId = null;

const dom = {
  status: document.querySelector('[data-role="status"]'),
  progressLabel: document.querySelector('[data-role="progress-label"]'),
  lastRoll: document.querySelector('[data-role="last-roll"]'),
  boardMode: document.querySelector('[data-role="board-mode"]'),
  rollTrigger: document.querySelector('[data-role="roll-trigger"]'),
  diceArt: document.querySelector('[data-role="dice-art"]'),
  boardStage: document.querySelector('[data-role="board-stage"]'),
  boardPlane: document.querySelector('[data-role="board-plane"]'),
};

function delay(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function getRandomFace() {
  return rollFaces[Math.floor(Math.random() * rollFaces.length)];
}

function toScreenPosition(x, y) {
  const rawX = originX + (x + y) * tileStepX;
  const rawY = originY + (y - x) * tileStepY;

  return {
    screenX: Math.round(rawX),
    screenY: Math.floor(rawY),
  };
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
  return buildRingCoordinates(7).map((coord, index) => {
    const kind = index === 0 ? 'start' : tileKinds[(index - 1) % tileKinds.length];
    return {
      id: `tile-${index}`,
      label: labels[index] || `Tile ${index + 1}`,
      kind,
      gridX: coord.x,
      gridY: coord.y,
      ...toScreenPosition(coord.x, coord.y),
    };
  });
}

function getDiceMarkup(face, className, variant) {
  const pips = pipLayout[face]
    .map(([cx, cy]) => `<circle cx="${cx}" cy="${cy}" fill="#13202b" r="5.8"></circle>`)
    .join('');

  return `
    <svg aria-hidden="true" class="dice-vector ${className}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="diceGradient-${variant}" x1="12%" x2="90%" y1="6%" y2="100%">
          <stop offset="0%" stop-color="#fff6dc"></stop>
          <stop offset="58%" stop-color="#f6d57f"></stop>
          <stop offset="100%" stop-color="#d18736"></stop>
        </linearGradient>
        <linearGradient id="edgeGradient-${variant}" x1="50%" x2="50%" y1="0%" y2="100%">
          <stop offset="0%" stop-color="#ffd99b"></stop>
          <stop offset="100%" stop-color="#8c4a1e"></stop>
        </linearGradient>
      </defs>
      <path d="M22 22L50 10L78 22L78 50L50 62L22 50Z" fill="url(#diceGradient-${variant})" stroke="#fce8b7" stroke-width="3"></path>
      <path d="M22 50L50 62L50 88L22 74Z" fill="url(#edgeGradient-${variant})" opacity="0.92"></path>
      <path d="M50 62L78 50L78 74L50 88Z" fill="#9d5625" opacity="0.94"></path>
      <rect x="26" y="26" width="48" height="48" rx="12" fill="#fff9eb"></rect>
      ${pips}
      <path d="M27 34C34 27 43 22 58 20" fill="none" opacity="0.65" stroke="#ffffff" stroke-linecap="round" stroke-width="4"></path>
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

function renderHud() {
  const canRoll = state.tiles.length > 0 && !state.isRolling && !state.isMoving;
  dom.status.textContent = state.status;
  dom.progressLabel.textContent = state.tiles.length ? `${state.position + 1} / ${state.tiles.length}` : '0 / 0';
  dom.lastRoll.textContent = state.lastRoll === null ? '-' : String(state.lastRoll);
  dom.boardMode.textContent = state.boardMode;
  dom.rollTrigger.disabled = !canRoll;
  dom.rollTrigger.classList.toggle('is-rolling', state.isRolling);
  dom.rollTrigger.setAttribute(
    'aria-label',
    state.isRolling ? 'Rolling dice' : state.isMoving ? 'Character is moving' : 'Roll dice',
  );
}

function renderCamera() {
  if (!state.tiles.length || !dom.boardStage) {
    return;
  }

  const currentTile = state.tiles[state.position];
  const stageWidth = dom.boardStage.clientWidth;
  const stageHeight = dom.boardStage.clientHeight;
  const tileCenterX = currentTile.screenX + 26;
  const tileCenterY = currentTile.screenY + 26;
  const targetX = stageWidth * 0.5;
  const targetY = stageHeight * 0.56;
  const translateX = targetX - tileCenterX;
  const translateY = targetY - tileCenterY;

  dom.boardPlane.style.transform = `translate(${translateX}px, ${translateY}px)`;
}

function renderBoard() {
  const tilesMarkup = state.tiles
    .map((tile, index) => {
      const currentClass = index === state.position ? 'is-current' : '';
      return `
        <article class="board-tile tile-${tile.kind} ${currentClass}" aria-label="${tile.label}" style="left:${tile.screenX}px;top:${tile.screenY}px;"></article>
      `;
    })
    .join('');

  const currentTile = state.tiles[state.position];
  const tokenMarkup = currentTile
    ? `
      <div class="player-token ${state.isMoving ? 'is-travelling' : ''}" style="left:${currentTile.screenX}px;top:${currentTile.screenY - 44}px;">
        <div class="token-shadow"></div>
        <div class="token-body">
          <span class="token-head"></span>
          <span class="token-core"></span>
        </div>
      </div>
    `
    : '';

  dom.boardPlane.innerHTML = `${tilesMarkup}${tokenMarkup}`;
}

function render() {
  renderHud();
  renderDice(state.diceFace);
  renderBoard();
  renderCamera();
}

function updateState(partialState) {
  Object.assign(state, partialState);
  render();
}

async function moveToken(steps) {
  updateState({
    isMoving: true,
    status: `Moving ${steps} tile${steps === 1 ? '' : 's'}...`,
  });

  let nextIndex = state.position;

  for (let step = 0; step < steps; step += 1) {
    await delay(stepDelayMs);
    nextIndex = (nextIndex + 1) % state.tiles.length;
    updateState({ position: nextIndex });
  }

  updateState({
    isMoving: false,
    lastRoll: steps,
    status: `Landed on ${state.tiles[nextIndex].label}.`,
  });
}

async function handleRoll() {
  const canRoll = state.tiles.length > 0 && !state.isRolling && !state.isMoving;
  if (!canRoll) {
    return;
  }

  updateState({
    isRolling: true,
    status: 'Rolling dice...',
  });

  diceIntervalId = window.setInterval(() => {
    updateState({ diceFace: getRandomFace() });
  }, 90);

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
  updateState({
    tiles: buildTiles(),
    status: 'Tap the dice to start your next move.',
  });
}

dom.rollTrigger.addEventListener('click', handleRoll);
window.addEventListener('resize', renderCamera);
window.addEventListener('beforeunload', () => {
  if (diceIntervalId) {
    window.clearInterval(diceIntervalId);
  }
});

bootstrap();
