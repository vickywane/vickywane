/*
  Rope physics for the hanging banner. Pure functions so they can be tested
  without layout or animation frames.

  Model: two strings of a fixed rest length hold the bar. Pulling stretches
  them; the further they stretch the harder they resist (the bar follows the
  pointer less and less), and they cannot stretch past MAX_STRETCH. Pushing
  the bar up only makes the strings go slack.
*/

/** Nails sit 2px under the header border (see HangingBanner). */
export const NAIL_Y = 2
/** Furthest a string can stretch beyond its rest length, in px. */
export const MAX_STRETCH = 140
/** How far the bar can be pushed up before the slack strings stop it. */
const MAX_PUSH_UP = 50
const MAX_TILT = 7

/** Laid-out geometry of the untransformed bar inside the banner frame. */
export interface Rig {
  /** Bar width. */
  width: number
  /** Nail centre distance from each end of the bar. */
  inset: number
  /** Bar top: the distance a string hangs from its nail at rest. */
  rest: number
}

export interface StringGeometry {
  nailX: number
  knotX: number
  knotY: number
  restLength: number
  span: number
  /** Stretch beyond the rest length, in px (0 when slack). */
  extension: number
}

export const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value))

/** Sideways pulls tilt the bar a little, as if it swings from one string. */
export const tiltFor = (x: number) => clamp(x * 0.045, -MAX_TILT, MAX_TILT)

/** Where one string runs, from its nail to its knot on the (moved) bar. */
export const stringGeometry = (
  side: -1 | 1,
  dx: number,
  dy: number,
  rig: Rig
): StringGeometry => {
  const { width, inset, rest } = rig
  const nailX = side < 0 ? inset : width - inset
  const reach = nailX - width / 2
  // The bar tilts about its top centre.
  const rad = (tiltFor(dx) * Math.PI) / 180
  const knotX = width / 2 + dx + reach * Math.cos(rad)
  const knotY = rest + dy + reach * Math.sin(rad)

  const restLength = Math.max(1, rest - NAIL_Y)
  const span = Math.hypot(knotX - nailX, knotY - NAIL_Y)

  return {
    nailX,
    knotX,
    knotY,
    restLength,
    span,
    extension: Math.max(0, span - restLength),
  }
}

/** 0 at rest, 1 when the more-stretched string is at its limit. */
export const strainAt = (dx: number, dy: number, rig: Rig) =>
  clamp(
    Math.max(
      stringGeometry(-1, dx, dy, rig).extension,
      stringGeometry(1, dx, dy, rig).extension
    ) / MAX_STRETCH,
    0,
    1
  )

/**
 * Bar offset for a pointer drag of (dx, dy). Close to 1:1 for small pulls,
 * stiffening as the strings stretch (each extra px of pointer travel buys
 * less movement), and stopping dead at MAX_STRETCH.
 */
export const pullFromPointer = (dx: number, dy: number, rig: Rig) => {
  const down = Math.max(0, dy)
  const magnitude = Math.hypot(dx, down)

  // Hooke-ish with stiffening: slope 1 at rest, then each px of pointer
  // travel buys less. Tuned so the hard stop arrives after ~380px of pull.
  const reach = MAX_STRETCH * 1.6
  const pulled = magnitude ? reach * (1 - 1 / (1 + magnitude / reach)) : 0
  const scale = magnitude ? pulled / magnitude : 0

  let x = dx * scale
  let y = dy >= 0 ? down * scale : -slackPush(-dy)

  // Hard stop: shrink the move until neither string is over its limit.
  if (rig.width && strainAt(x, y, rig) >= 1) {
    let low = 0
    let high = 1
    for (let step = 0; step < 18; step++) {
      const mid = (low + high) / 2
      if (strainAt(x * mid, y * mid, rig) < 1) low = mid
      else high = mid
    }
    x *= low
    y *= low
  }

  return { x, y }
}

/** Slack strings give a little when pushed up, then the bar stops. */
const slackPush = (distance: number) =>
  MAX_PUSH_UP * (1 - 1 / (1 + (distance * 0.55) / MAX_PUSH_UP))

const INK = [19, 17, 18]
const STRAINED = [196, 54, 38]

export interface RopeStyle {
  dash: string
  color: string
  width: number
}

/**
 * How a string looks under strain (0–1): its fibres separate into segments
 * whose gaps widen the harder it is pulled, it thins, and it shifts from
 * ink towards red.
 */
export const ropeStyle = (strain: number): RopeStyle => {
  const s = clamp(strain, 0, 1)
  const [r, g, b] = INK.map((from, i) =>
    Math.round(from + (STRAINED[i] - from) * s)
  )

  const dash =
    s < 0.05
      ? "none"
      : `${(6 - 3 * s).toFixed(2)} ${(0.8 + 5.2 * s).toFixed(2)}`

  return {
    dash,
    color: `rgb(${r}, ${g}, ${b})`,
    width: Number((1 - 0.25 * s).toFixed(3)),
  }
}

/** A tighter string snaps back faster; damping keeps the bounce the same. */
export const releaseSpring = (strain: number) => {
  const stiffness = 110 + 220 * clamp(strain, 0, 1)

  return {
    type: "spring" as const,
    stiffness,
    damping: 0.85 * Math.sqrt(stiffness),
  }
}
