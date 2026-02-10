'use client'

import {
  MediaControlBar,
  MediaController,
  MediaFullscreenButton,
  MediaMuteButton,
  MediaPlayButton,
  MediaSeekBackwardButton,
  MediaSeekForwardButton,
  MediaTimeDisplay,
  MediaTimeRange,
  MediaVolumeRange,
} from 'media-chrome/react'
import type { ComponentProps, CSSProperties } from 'react'
import { cn } from '@/shared/lib/utils'

export type VideoPlayerProps = ComponentProps<typeof MediaController>

const variables = {
  '--media-primary-color': 'var(--primary)',
  '--media-secondary-color':
    'color-mix(in srgb, var(--background) 80%, transparent)',
  '--media-text-color': 'var(--foreground)',
  '--media-background-color': 'var(--background)',
  '--media-control-background':
    'color-mix(in srgb, var(--background) 80%)',
  '--media-control-hover-background':
    'color-mix(in srgb, var(--background) 80%)',
  '--media-live-button-icon-color': 'var(--muted-foreground)',
  '--media-live-button-indicator-color': 'var(--destructive)',
  '--media-control-padding': '8px', 
  '--media-control-height': '28px',
  '--media-button-icon-width': '32px',
  '--media-button-icon-height': '32px',
  '--media-range-track-background': 'var(--border)',
  '--media-range-track-height': '4px',
  '--media-range-thumb-width': '10px',
  '--media-range-thumb-height': '10px',
  '--media-range-thumb-border-radius': '16px',
} as CSSProperties

export const VideoPlayer = ({
  style,
  className,
  ...props
}: VideoPlayerProps) => (
  <MediaController
    {...props}
    className={cn(
      'group relative flex w-full flex-col overflow-hidden rounded-lg border bg-background text-foreground',
      className,
    )}
    style={{ ...variables, ...style }}
  />
)

export type VideoPlayerControlBarProps = ComponentProps<typeof MediaControlBar>

export const VideoPlayerControlBar = ({
  className,
  ...props
}: VideoPlayerControlBarProps) => (
  <MediaControlBar
    {...props}
    className={cn(
      'flex w-full items-center gap-2 border-t border-border bg-background/80 px-3 py-2 text-foreground backdrop-blur-sm',
      className,
    )}
  />
)

export type VideoPlayerTimeRangeProps = ComponentProps<typeof MediaTimeRange>

export const VideoPlayerTimeRange = ({
  className,
  ...props
}: VideoPlayerTimeRangeProps) => (
  <MediaTimeRange {...props} className={cn('flex-1', className)} />
)

export type VideoPlayerTimeDisplayProps = ComponentProps<
  typeof MediaTimeDisplay
>

export const VideoPlayerTimeDisplay = ({
  className,
  ...props
}: VideoPlayerTimeDisplayProps) => (
  <MediaTimeDisplay
    {...props}
    className={cn('text-xs tabular-nums text-muted-foreground', className)}
  />
)

export type VideoPlayerVolumeRangeProps = ComponentProps<
  typeof MediaVolumeRange
>

export const VideoPlayerVolumeRange = ({
  className,
  ...props
}: VideoPlayerVolumeRangeProps) => (
  <MediaVolumeRange {...props} className={cn('w-24', className)} />
)

export type VideoPlayerPlayButtonProps = ComponentProps<typeof MediaPlayButton>

export const VideoPlayerPlayButton = ({
  className,
  ...props
}: VideoPlayerPlayButtonProps) => (
  <MediaPlayButton {...props} className={cn('text-foreground', className)} />
)

export type VideoPlayerSeekBackwardButtonProps = ComponentProps<
  typeof MediaSeekBackwardButton
>

export const VideoPlayerSeekBackwardButton = ({
  className,
  ...props
}: VideoPlayerSeekBackwardButtonProps) => (
  <MediaSeekBackwardButton
    {...props}
    className={cn('text-foreground', className)}
  />
)

export type VideoPlayerSeekForwardButtonProps = ComponentProps<
  typeof MediaSeekForwardButton
>

export const VideoPlayerSeekForwardButton = ({
  className,
  ...props
}: VideoPlayerSeekForwardButtonProps) => (
  <MediaSeekForwardButton
    {...props}
    className={cn('text-foreground', className)}
  />
)

export type VideoPlayerMuteButtonProps = ComponentProps<typeof MediaMuteButton>

export const VideoPlayerMuteButton = ({
  className,
  ...props
}: VideoPlayerMuteButtonProps) => (
  <MediaMuteButton {...props} className={cn('text-foreground', className)} />
)

export type VideoPlayerFullscreenButtonProps = ComponentProps<
  typeof MediaFullscreenButton
>

export const VideoPlayerFullscreenButton = ({
  className,
  ...props
}: VideoPlayerFullscreenButtonProps) => (
  <MediaFullscreenButton
    {...props}
    className={cn('text-foreground', className)}
  />
)

export type VideoPlayerContentProps = ComponentProps<'video'>

export const VideoPlayerContent = ({
  className,
  ...props
}: VideoPlayerContentProps) => (
  <video
    {...props}
    className={cn('aspect-video w-full bg-black', className)}
    suppressHydrationWarning
    controls={false}
    tabIndex={-1}
    slot="media"
  />
)
