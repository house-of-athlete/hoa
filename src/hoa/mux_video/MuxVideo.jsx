import PropTypes from "prop-types"
import React, { useEffect, useRef, useState } from "react"
import Hls from "hls.js"
import { isArray, isNumber } from "lodash"

const initVideoPlayback = ({ allowNativeHls, elem, playbackId, poster }) => {
  const hlsSrc = `https://stream.mux.com/${playbackId}.m3u8`

  elem.poster = poster

  if (allowNativeHls && elem.canPlayType("application/vnd.apple.mpegurl")) {
    elem.src = hlsSrc
  } else if (Hls.isSupported()) {
    const hls = new Hls()
    hls.loadSource(hlsSrc)
    hls.attachMedia(elem)

    return () => {
      hls.detachMedia()
    }
  } else {
    console.warn("falling back to mp4 video")

    elem.src = `https://stream.mux.com/${playbackId}/high.mp4`
  }
}

const getArWidthAndHeight = video => {
  if (video) {
    const [width, height] = video.data.aspect_ratio.split(":").map(Number)
    return { height, width }
  } else {
    return {}
  }
}

const getPoster = (video, { autoPlay }) => {
  if (!video) {
    return null
  }

  const params = new URLSearchParams()

  if (isNumber(video.thumbTime)) {
    params.set("time", video.thumbTime)
  }

  if (autoPlay) {
    params.set("time", 0)
    params.set("width", 600)
  }

  return `https://image.mux.com/${video.playbackId}/thumbnail.jpg?${params}`
}

export const MuxVideo = React.forwardRef(
  ({ autoPlay, video, ...props }, ref) => {
    const localRef = useRef()
    ref ||= localRef

    const [activeVideo, setActiveVideo] = useState(
      !isArray(video) ? video : null
    )

    useEffect(() => {
      if (isArray(video)) {
        // `video` is an array of video objects with media queries. Chrome doesn't support the
        // `media` attribute on a `<source>` element within a `<video>` element. Therefore, we need
        // to use JS to find the matching video. This means that the browser won't be able to start
        // downloading the video/poster until after our JS loads.
        const updateActiveVideo = () => {
          setActiveVideo(
            video.find(({ media }) => window.matchMedia(media).matches)?.video
          )
        }

        window.addEventListener("resize", updateActiveVideo)
        updateActiveVideo()

        return () => {
          window.removeEventListener("resize", updateActiveVideo)
        }
      }
    }, [video])

    const poster = getPoster(activeVideo, { autoPlay })

    useEffect(() => {
      if (!activeVideo) {
        return
      }

      const result = initVideoPlayback({
        // Safari has a bug when playing HLS videos in a loop so don't use native HLS with loops.
        // https://mux.com/blog/mobile-safari-hls-bug-with-short-form-looping-videos/
        allowNativeHls: !props.loop,
        elem: ref.current,
        playbackId: activeVideo.playbackId,
        poster,
      })

      // See https://docs.mux.com/guides/video/web-autoplay-your-videos
      if (autoPlay) {
        ref.current.play().catch(error => {
          console.error("error while starting video playback", error)
        })
      }

      return result
    }, [activeVideo?.playbackId])

    return (
      <>
        {isArray(video) && (
          <>
            <link rel="preconnect" href="https://image.mux.com" />
            <link rel="preconnect" href="https://stream.mux.com" />
          </>
        )}

        <video
          {...getArWidthAndHeight(activeVideo)}
          {...props}
          poster={poster}
          ref={ref}
        />
      </>
    )
  }
)

MuxVideo.propTypes = {
  autoPlay: PropTypes.bool,
  loop: PropTypes.bool,

  video: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
  ]).isRequired,
}
