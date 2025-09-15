import {
  MediaControlBar,
  MediaController,
  MediaFullscreenButton,
  MediaPlayButton,
  MediaVolumeRange,
} from "media-chrome/react"
import ReactPlayer from "react-player"

export const Video = ({ source }: { source: string }) => {
  if (!source) {
    console.warn("No video source provided")
    return null
  }

  return (
    <MediaController className="h-full w-full rounded-3xl">
      <ReactPlayer
        className="h-full rounded-3xl"
        height={"100%"}
        width={"100%"}
        slot="media"
        src={source}
        {...{
          controls: false,
          loop: true,
          muted: false,
          autoPlay: false,
        }}
      />

      <div className="flex w-full justify-center">
        <MediaControlBar className="flex flex-row gap-4">
          <MediaPlayButton />
          <MediaVolumeRange />
          <MediaFullscreenButton />
        </MediaControlBar>
      </div>
    </MediaController>
  )
}
