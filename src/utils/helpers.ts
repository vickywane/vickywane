export const truncateText = (text: string, length: number) => {
  if (text) {
    const arr = text.split(" ").slice(0, length)

    return `${arr.join(" ")}...`
  }

  return text
}
