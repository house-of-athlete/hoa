import PropTypes from "prop-types"
import React, { useEffect, useRef } from "react"
import styled from "@emotion/styled"
import { SanityImage } from "../sanity_image"
import { CMSLink } from "../links"

const Tile = styled(CMSLink)`
  margin-right: var(--grid-gap);
  width: var(--tile-width);

  --tile-width: 241px;

  @media (min-width: 736px) {
    --tile-width: 360px;
  }
  @media (min-width: 1280px) {
    --tile-width: 25vw;
  }
`

const Items = ({ items }) => (
  <div className="flex flex-grow-0 flex-shrink-0">
    {items.map(item => (
      <Tile
        key={item._key}
        className="flex-grow-0 flex-shrink-0 group"
        link={item.link}
      >
        <div className="relative">
          <SanityImage image={item.image} className="mb-2 rounded-sm" />

          {item.buttonText && (
            <div
              className="
                absolute
                bg-black
                bg-opacity-40
                duration-300
                flex
                justify-center
                inset-0
                items-center
                opacity-0
                rounded-sm
                transition-opacity
                group-hover:opacity-100
            "
            >
              <span className="hoa-button hoa-button--dark-on-light hoa-button--inline">
                {item.buttonText}
              </span>
            </div>
          )}
        </div>

        {item.title && <div className="text-sm">{item.title}</div>}
        {item.subtitle && <div className="text-xs">{item.subtitle}</div>}
      </Tile>
    ))}
  </div>
)

Items.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export const ImageMarquee = ({ items }) => {
  const isMouseOverRef = useRef(false)
  const scrollRef = useRef()

  useEffect(() => {
    let lastTimestamp
    let isRunning = true
    let translation = 0

    const step = timestamp => {
      lastTimestamp ||= timestamp

      if (!isRunning) {
        return
      }

      requestAnimationFrame(step)

      if (!scrollRef.current) {
        return
      }

      const itemsWidth = scrollRef.current.firstChild.offsetWidth
      const factor = isMouseOverRef.current ? 0.015 : 0.04

      translation -= factor * (timestamp - lastTimestamp)

      scrollRef.current.style.transform = `translateX(${
        translation % itemsWidth
      }px)`

      lastTimestamp = timestamp
    }

    requestAnimationFrame(step)

    return () => {
      isRunning = false
    }
  }, [])

  return (
    <div
      className="overflow-x-hidden"
      onMouseEnter={() => {
        isMouseOverRef.current = true
      }}
      onMouseLeave={() => {
        isMouseOverRef.current = false
      }}
    >
      <div className="flex" ref={scrollRef}>
        <Items items={items} />
        <Items items={items} />
      </div>
    </div>
  )
}

ImageMarquee.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
}
