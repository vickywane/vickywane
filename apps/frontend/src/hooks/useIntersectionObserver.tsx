import React, { useEffect, useRef, useState } from "react"

interface useObserverProps {
  threshold: number, // Element is considered visible when 50% in view
  rootMargin: string,
  root?: any
  id?: string

  callback?: (id: string) => void
}

const useIntersectionObserver = ({ threshold, rootMargin, id, root, callback }: useObserverProps) => {
  const [isInView, setIsInView] = useState(false)
  const [hasBeenInView, setHasBeenInView] = useState(false)
  const elementRef = useRef(null)

  useEffect(() => {
    if (typeof window === "undefined" || !elementRef.current) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isElementInView = entry.isIntersecting
        setIsInView(isElementInView)

        if (callback && id) {
            callback(id)
        }

        if (isElementInView && !hasBeenInView) {
          setHasBeenInView(true)
        }
      },
      {
        threshold: threshold || 0,
        rootMargin: rootMargin || "0px",
        root: root || null,
      }
    )

    observer.observe(elementRef.current)

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current)
      }
    }
  }, [threshold, rootMargin, root, hasBeenInView])

  return {
    ref: elementRef,
    isInView,
    hasBeenInView,
  }
}

export default useIntersectionObserver
