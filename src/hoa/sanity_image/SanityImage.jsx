import PropTypes from "prop-types"
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"
import styled from "@emotion/styled"
import { useFullWidthSizes } from "@hoa/hoa.ui.use_full_width_sizes"
import { sanityImageUrl } from "./sanityUtil"

export const ImgLoadingContext = createContext()

const breakpoints = [
  320, 400, 654, 768, 1024, 1366, 1670, 2048, 2560, 3440, 4096,
]

const sanitySourceSet = baseUrl =>
  breakpoints.map(w => `${sanityImageUrl(baseUrl, { w })} ${w}w`).join(", ")

export const SanityImage = ({
  alt = "",
  className,
  image,
  loading,
  renderLoadingBackground = true,
  sizes,
  title,
}) => {
  const imgRef = useRef(null)

  const [backgroundColor, setBackgroundColor] = useState(
    renderLoadingBackground ? image.metadata.palette.dominant.background : ""
  )

  const fullWidthSizes = useFullWidthSizes()
  sizes ||= fullWidthSizes

  const loadingFromContext = useContext(ImgLoadingContext)
  loading ||= loadingFromContext || "lazy"

  const clearBackgroundColor = () => {
    setBackgroundColor("")
  }

  useEffect(() => {
    if (imgRef.current.complete && backgroundColor) {
      // handle case where image finished loading before onLoad handler was installed
      clearBackgroundColor()
    }
  }, [])

  const { height, width } = image.metadata.dimensions

  return (
    <img
      ref={imgRef}
      onLoad={clearBackgroundColor}
      onError={clearBackgroundColor}
      alt={alt}
      className={className}
      decoding={loading === "lazy" ? "async" : "auto"}
      loading={loading}
      sizes={sizes}
      src={sanityImageUrl(image.url)}
      srcSet={sanitySourceSet(image.url)}
      title={title}
      style={{ backgroundColor }}
      // relying on aspect ratio calculation in modern browsers:
      // https://developer.mozilla.org/en-US/docs/Web/Media/images/aspect_ratio_mapping
      height={height}
      width={width}
    />
  )
}

SanityImage.propTypes = {
  alt: PropTypes.string,
  className: PropTypes.string,
  image: PropTypes.object.isRequired,
  loading: PropTypes.string,
  renderLoadingBackground: PropTypes.bool,
  sizes: PropTypes.string,
  title: PropTypes.string,
}

/**
 * For rendering responsive images with fluid width. See "The Fluid- And Variable-Sized-Image Use
 * Cases" in
 * https://www.smashingmagazine.com/2014/05/responsive-images-done-right-guide-picture-srcset/ for
 * details.
 */
export const FullWidthSanityImage = styled(SanityImage)`
  display: block;
  height: auto;
  object-fit: cover;
  width: 100%;
`
