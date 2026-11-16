import {
  MAX_STRETCH,
  pullFromPointer,
  releaseSpring,
  ropeStyle,
  strainAt,
  stringGeometry,
} from "@/components/heros/home/hangingRope"

// A 1200px desktop bar hanging 36px below the header.
const rig = { width: 1200, inset: 48, rest: 36 }

describe("hanging rope physics", () => {
  it("is unstrained at rest", () => {
    expect(strainAt(0, 0, rig)).toBe(0)
    expect(stringGeometry(-1, 0, 0, rig).extension).toBe(0)
  })

  it("follows the pointer closely for small pulls", () => {
    const { y } = pullFromPointer(0, 10, rig)

    expect(y).toBeGreaterThan(9)
    expect(y).toBeLessThanOrEqual(10)
  })

  it("resists more the further it is stretched", () => {
    const gains = [50, 100, 150, 200, 250].map(dy => pullFromPointer(0, dy, rig).y)
    const steps = gains.slice(1).map((gain, i) => gain - gains[i])

    gains.slice(1).forEach((gain, i) => expect(gain).toBeGreaterThan(gains[i]))
    steps.slice(1).forEach((step, i) => expect(step).toBeLessThan(steps[i]))
  })

  it.each([
    ["straight down", 0, 5000],
    ["down and sideways", 3000, 3000],
    ["sideways", 5000, 0],
    ["the other way", -5000, 200],
  ])("never stretches a string past its limit when pulled %s", (_, dx, dy) => {
    const { x, y } = pullFromPointer(dx, dy, rig)
    const stretch = Math.max(
      stringGeometry(-1, x, y, rig).extension,
      stringGeometry(1, x, y, rig).extension
    )

    expect(stretch).toBeLessThanOrEqual(MAX_STRETCH + 0.01)
    expect(stretch).toBeGreaterThan(MAX_STRETCH * 0.7)
  })

  it("only goes slack, not stretched, when pushed up", () => {
    const { y } = pullFromPointer(0, -400, rig)

    expect(y).toBeLessThan(0)
    expect(y).toBeGreaterThan(-50)
    expect(strainAt(0, y, rig)).toBe(0)
  })
})

describe("rope style under strain", () => {
  it("is a solid ink line at rest", () => {
    expect(ropeStyle(0)).toEqual({
      dash: "none",
      color: "rgb(19, 17, 18)",
      width: 1,
    })
  })

  it("opens wider gaps, thins and fades to grey the harder it is pulled", () => {
    const styles = [0.2, 0.5, 0.8, 1].map(ropeStyle)
    const gaps = styles.map(style => Number(style.dash.split(" ")[1]))
    const channels = styles.map(style => style.color.match(/\d+/g)!.map(Number))

    gaps.slice(1).forEach((gap, i) => expect(gap).toBeGreaterThan(gaps[i]))
    // Lighter with strain, and stays neutral (no colour cast).
    channels.slice(1).forEach(([r], i) => expect(r).toBeGreaterThan(channels[i][0]))
    channels.forEach(([r, g, b]) => {
      expect(Math.abs(r - g)).toBeLessThanOrEqual(4)
      expect(Math.abs(r - b)).toBeLessThanOrEqual(4)
    })
    styles
      .slice(1)
      .forEach((style, i) => expect(style.width).toBeLessThan(styles[i].width))
  })

  it("snaps back faster from a tighter pull", () => {
    expect(releaseSpring(1).stiffness).toBeGreaterThan(
      releaseSpring(0.2).stiffness
    )
  })
})

describe("rope edge cases", () => {
  it("still moves (with no hard stop) before the bar has been measured", () => {
    const unmeasured = { width: 0, inset: 0, rest: 0 }
    const { x, y } = pullFromPointer(0, 300, unmeasured)

    expect(Number.isFinite(x) && Number.isFinite(y)).toBe(true)
    expect(y).toBeGreaterThan(0)
  })

  it("does not move without pointer travel", () => {
    expect(pullFromPointer(0, 0, rig)).toEqual({ x: 0, y: 0 })
  })

  it("pulls left and right symmetrically", () => {
    const left = pullFromPointer(-200, 50, rig)
    const right = pullFromPointer(200, 50, rig)

    expect(left.x).toBeCloseTo(-right.x)
    expect(left.y).toBeCloseTo(right.y)
  })

  it("clamps strain outside 0–1 when styling the rope", () => {
    expect(ropeStyle(-1)).toEqual(ropeStyle(0))
    expect(ropeStyle(5)).toEqual(ropeStyle(1))
  })

  it("keeps the release spring finite and bouncy at any strain", () => {
    for (const strain of [-1, 0, 0.5, 1, 3]) {
      const { stiffness, damping } = releaseSpring(strain)
      const dampingRatio = damping / (2 * Math.sqrt(stiffness))

      expect(stiffness).toBeGreaterThan(0)
      expect(dampingRatio).toBeGreaterThan(0.3)
      expect(dampingRatio).toBeLessThan(0.6)
    }
  })
})
