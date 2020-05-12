import { useState, useEffect } from "react"

const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState(null)

  const handleWindowResize = () => {
    setWindowWidth(window.innerWidth)
  }

  useEffect(() => {
    setWindowWidth(window.innerWidth)

    window.addEventListener("resize", handleWindowResize)
    return () => window.removeEventListener("resize", handleWindowResize)
  }, [])

  return windowWidth
}

export default useWindowWidth
