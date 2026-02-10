'use client'

import { BASE_PATH, getPathWithBase } from '@/shared/lib/const'
import {
  VideoPlayer,
  VideoPlayerContent,
  VideoPlayerControlBar,
  VideoPlayerFullscreenButton,
  VideoPlayerMuteButton,
  VideoPlayerPlayButton,
  VideoPlayerSeekBackwardButton,
  VideoPlayerSeekForwardButton,
  VideoPlayerTimeDisplay,
  VideoPlayerTimeRange,
  VideoPlayerVolumeRange,
} from '@/shared/ui'

type VideoPageProps = {
  src?: string
}

const resolveVideoSrc = (src?: string) => {
  if (!src) return getPathWithBase('/videos/test-video.mp4')
  if (src.startsWith('http')) return src
  if (src.startsWith(BASE_PATH)) return src
  return getPathWithBase(src)
}

export function VideoPage({ src }: VideoPageProps) {
  const resolvedSrc = resolveVideoSrc(src)
  const onVideoDoubleClick = async (
    event: React.MouseEvent<HTMLVideoElement>,
  ) => {
    event.preventDefault()
    const element =
      (event.currentTarget.closest('media-controller') as HTMLElement | null) ??
      event.currentTarget
    if (document.fullscreenElement) {
      await document.exitFullscreen()
      return
    }
    if (element.requestFullscreen) {
      await element.requestFullscreen()
    }
  }

  return (
    <VideoPlayer>
      <VideoPlayerContent
        preload="metadata"
        playsInline
        src={resolvedSrc}
        onDoubleClick={onVideoDoubleClick}
      />
      <VideoPlayerControlBar>
        <VideoPlayerPlayButton />

        <VideoPlayerTimeRange className="mx-2" />
        <VideoPlayerTimeDisplay />
        <VideoPlayerTimeDisplay showDuration />
        <VideoPlayerMuteButton />
        <VideoPlayerVolumeRange />
        <VideoPlayerFullscreenButton />
      </VideoPlayerControlBar>
    </VideoPlayer>
  )
}
