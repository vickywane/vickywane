/*
  jsdom has no layout engine and leaves out several browser APIs the hero uses.
  These stubs only make the APIs callable; tests that depend on their behaviour
  (scroll positions, intersections, media queries) drive them explicitly.
*/

// PointerEvent: jsdom has MouseEvent but not PointerEvent.
if (typeof window.PointerEvent === "undefined") {
  class PointerEventStub extends MouseEvent {
    pointerId: number
    pointerType: string

    constructor(type: string, init: PointerEventInit = {}) {
      super(type, init)
      this.pointerId = init.pointerId ?? 1
      this.pointerType = init.pointerType ?? "mouse"
    }
  }

  window.PointerEvent = PointerEventStub as unknown as typeof PointerEvent
}

// Controllable IntersectionObserver: tests call `triggerIntersection`.
type ObserverRecord = {
  callback: IntersectionObserverCallback
  targets: Set<Element>
}

const observers = new Set<ObserverRecord>()

class IntersectionObserverStub {
  private record: ObserverRecord

  constructor(callback: IntersectionObserverCallback) {
    this.record = { callback, targets: new Set() }
    observers.add(this.record)
  }

  observe(target: Element) {
    this.record.targets.add(target)
  }

  unobserve(target: Element) {
    this.record.targets.delete(target)
  }

  disconnect() {
    this.record.targets.clear()
    observers.delete(this.record)
  }

  takeRecords() {
    return []
  }
}

window.IntersectionObserver =
  IntersectionObserverStub as unknown as typeof IntersectionObserver

/** Reports `target` entering or leaving every observer watching it. */
export const triggerIntersection = (target: Element, isIntersecting: boolean) => {
  observers.forEach(({ callback, targets }) => {
    if (!targets.has(target)) return
    callback(
      [{ target, isIntersecting } as IntersectionObserverEntry],
      {} as IntersectionObserver
    )
  })
}

// matchMedia: no queries match unless a test sets `mockMatchMedia`.
let matchingQueries: string[] = []

export const mockMatchMedia = (queries: string[]) => {
  matchingQueries = queries
}

window.matchMedia = (query: string) =>
  ({
    matches: matchingQueries.includes(query),
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }) as MediaQueryList

// Scrolling and pointer capture are no-ops; tests spy on them when needed.
Element.prototype.scrollTo = function scrollTo() {} as Element["scrollTo"]
Element.prototype.scrollIntoView = function scrollIntoView() {}
Element.prototype.setPointerCapture = function setPointerCapture() {}
Element.prototype.releasePointerCapture = function releasePointerCapture() {}

export const resetBrowserMocks = () => {
  matchingQueries = []
}
